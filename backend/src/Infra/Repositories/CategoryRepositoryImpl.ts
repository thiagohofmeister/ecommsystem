import { IsNull } from 'typeorm'

import { Category } from '../../Domain/Category/Models/Category'
import { CategoryRepository } from '../../Domain/Category/Repositories/CategoryRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { CategoryDao } from '../Models/CategoryDao'

export class CategoryRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Category, CategoryDao>
  implements CategoryRepository
{
  async findAllByParentId(parentId: string): Promise<Category[]> {
    const query = await this.repository
      .createQueryBuilder()
      .where({ storeId: this.storeId, parent: { id: parentId || IsNull() } })

    return (await this.getMany(query)).items
  }

  async findOneByUrn(urn: string): Promise<Category> {
    return this.getOne({
      where: { storeId: this.storeId, urn }
    })
  }
}
