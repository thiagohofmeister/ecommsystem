import { kebabCase } from 'lodash'

import { CategoryQueue } from '../../Infra/Queues/CategoryQueue'
import { InvalidDataException } from '../../Shared/Models/Exceptions/InvalidDataException'
import { RedisCollection } from '../../Shared/Models/RedisCollection'
import { CategoryValidator } from './CategoryValidator'
import { CategoryCreateDto } from './Dto/CategoryCreateDto'
import { CategorySaveDto } from './Dto/CategorySaveDto'
import { CategoryDataNotFound } from './Exceptions/CategoryDataNotFound'
import { Category } from './Models/Category'
import { CategoryTree } from './Models/CategoryTree'
import { CategoryRepository } from './Repositories/CategoryRepository'
import { CategoryTreeCacheRepository } from './Repositories/CategoryTreeCacheRepository'

export class CategoryService {
  private CATEGORY_CREATED_EVENT = 'categoryCreated'
  private CATEGORY_UPDATED_EVENT = 'categoryUpdated'
  private CACHE_NAME: string = 'categoryTreeCache'

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryValidator: CategoryValidator,
    private readonly categoryQueue: CategoryQueue,
    private readonly categoryTreeCacheRepository: CategoryTreeCacheRepository
  ) {}

  public async create(storeId: string, data: CategoryCreateDto): Promise<Category> {
    await this.categoryValidator.categoryCreatePayloadValidate(data)

    return this.save(storeId, data)
  }

  public async update(id: string, storeId: string, data: CategoryCreateDto): Promise<Category> {
    await this.categoryValidator.categoryCreatePayloadValidate(data)

    return this.save(storeId, data, await this.getOneById(id))
  }

  public async getOneById(id: string): Promise<Category> {
    const result = await this.categoryRepository.findOneByPrimaryColumn(id)

    if (!result) throw new CategoryDataNotFound()

    return result
  }

  public async getTree(ignoreCache: boolean = false): Promise<CategoryTree[]> {
    const cache = await this.getCache()

    if (cache && !ignoreCache) return cache.getValue()

    const categoryTree = await this.getCategories()

    await this.createCache(categoryTree)

    return categoryTree
  }

  public async getCache() {
    try {
      return await this.categoryTreeCacheRepository.findOneByPrimaryColumn(this.CACHE_NAME)
    } catch (e) {
      return null
    }
  }

  private async createCache(categoryTree: CategoryTree[]) {
    return this.categoryTreeCacheRepository.save(
      new RedisCollection(this.CACHE_NAME, categoryTree, 60 * 30) // 30min
    )
  }

  private async getCategories(
    category: CategoryTree = null,
    categoriesTree: CategoryTree[] = []
  ): Promise<CategoryTree[]> {
    const categories = await this.categoryRepository.findAllByParentId(category?.getId() || null)

    for (let i = 0; i < categories.length; i++) {
      const categoryFound = categories[i]
      const categoryTree = new CategoryTree(
        categoryFound.getId(),
        categoryFound.getLabel(),
        categoryFound.getUrn()
      )

      if (!category) {
        categoriesTree.push(categoryTree)
      } else {
        category.getChildren().push(categoryTree)
      }

      await this.getCategories(categoryTree)
    }

    return categoriesTree
  }

  private async save(
    storeId: string,
    data: CategorySaveDto,
    category?: Category
  ): Promise<Category> {
    const categorySaved = await this.categoryRepository.save(
      await this.getCategoryToSave(storeId, data, category)
    )

    await this.categoryQueue.sendMessage(
      !!category ? this.CATEGORY_UPDATED_EVENT : this.CATEGORY_CREATED_EVENT,
      {
        categoryId: categorySaved.getId(),
        storeId
      }
    )

    return categorySaved
  }

  private async getCategoryToSave(
    storeId: string,
    data: CategorySaveDto,
    category?: Category
  ): Promise<Category> {
    if (!category) {
      return new Category(
        storeId,
        data.label,
        await this.generateUrn(data.urn || data.label),
        data.description,
        await this.getParent(data.parent?.id)
      )
    }

    if (data.hasOwnProperty('description')) {
      category.setDescription(data.description)
    }

    if (data.hasOwnProperty('label')) {
      category.setLabel(data.label)
    }

    if (data.hasOwnProperty('parent')) {
      category.setParent(await this.getParent(data.parent.id))
    }

    return category.setUrn(
      await this.generateUrn(data.urn || data.label || category.getLabel(), category)
    )
  }

  private async generateUrn(str: string, category?: Category, count: number = 0) {
    const slug = `${kebabCase(str)}${count ? `-${count}` : ''}`

    const categoryFound = await this.categoryRepository.findOneByUrn(slug)

    if (!categoryFound || categoryFound.getId() === category?.getId()) {
      return slug
    }

    return this.generateUrn(str, category, ++count)
  }

  private async getParent(id: string) {
    if (!id) {
      return null
    }

    const parent = await this.getOneById(id)

    if (parent) return parent

    throw new InvalidDataException('Invalid data.', [
      {
        id: `parent.id.${id}.notFound`,
        message: `Field parent.id.${id} not found.`
      }
    ])
  }
}
