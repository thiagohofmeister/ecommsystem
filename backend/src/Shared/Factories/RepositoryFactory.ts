import { RedisClientType } from 'redis'
import { DataSource, EntityManager } from 'typeorm'

import { AttributeRepository } from '../../Domain/Attribute/Repositories/AttributeRepository'
import { AuthenticationRepository } from '../../Domain/Authentication/Repositories/AuthenticationRepository'
import { BrandRepository } from '../../Domain/Brand/Repositories/BrandRepository'
import { CategoryRepository } from '../../Domain/Category/Repositories/CategoryRepository'
import { CategoryTreeCacheRepository } from '../../Domain/Category/Repositories/CategoryTreeCacheRepository'
import { ImageRepository } from '../../Domain/Product/Repositories/ImageRepository'
import { PriceRepository } from '../../Domain/Product/Repositories/PriceRepository'
import { StoreRepository } from '../../Domain/Store/Repositories/StoreRepository'
import { UserRepository } from '../../Domain/User/Repositories/UserRepository'
import { StockRepository } from '../../Domain/Variation/Repositories/StockRepository'
import { VariationAttributeRepository } from '../../Domain/Variation/Repositories/VariationAttributeRepository'
import { VariationRepository } from '../../Domain/Variation/Repositories/VariationRepository'
import { WarehouseRepository } from '../../Domain/Warehouse/Repositories/WarehouseRepository'
import { AttributeDao } from '../../Infra/Models/AttributeDao'
import { BrandDao } from '../../Infra/Models/BrandDao'
import { CategoryDao } from '../../Infra/Models/CategoryDao'
import { ImageDao } from '../../Infra/Models/ImageDao'
import { PriceDao } from '../../Infra/Models/PriceDao'
import { ProductDao } from '../../Infra/Models/ProductDao'
import { StockDao } from '../../Infra/Models/StockDao'
import { StoreDao } from '../../Infra/Models/StoreDao'
import { UserDao } from '../../Infra/Models/UserDao'
import { VariationAttributeDao } from '../../Infra/Models/VariationAttributeDao'
import { VariationDao } from '../../Infra/Models/VariationDao'
import { WarehouseDao } from '../../Infra/Models/WarehouseDao'
import { AttributeRepositoryImpl } from '../../Infra/Repositories/AttributeRepositoryImpl'
import { AuthenticationRepositoryImpl } from '../../Infra/Repositories/AuthenticationRepositoryImpl'
import { BrandRepositoryImpl } from '../../Infra/Repositories/BrandRepositoryImpl'
import { CategoryRepositoryImpl } from '../../Infra/Repositories/CategoryRepositoryImpl'
import { CategoryTreeCacheRepositoryImpl } from '../../Infra/Repositories/CategoryTreeCacheRepositoryImpl'
import { ImageRepositoryImpl } from '../../Infra/Repositories/ImageRepository'
import { PriceRepositoryImpl } from '../../Infra/Repositories/PriceRepository'
import { ProductRepositoryImpl } from '../../Infra/Repositories/ProductRepositoryImpl'
import { StockRepositoryImpl } from '../../Infra/Repositories/StockRepositoryImpl'
import { StoreRepositoryImpl } from '../../Infra/Repositories/StoreRepositoryImpl'
import { UserRepositoryImpl } from '../../Infra/Repositories/UserRepositoryImpl'
import { VariationAttributeRepositoryImpl } from '../../Infra/Repositories/VariationAttributeRepository'
import { VariationRepositoryImpl } from '../../Infra/Repositories/VariationRepository'
import { WarehouseRepositoryImpl } from '../../Infra/Repositories/WarehouseRepositoryImpl'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(
    private readonly dataMapperFactory: DataMapperFactory,
    private readonly dataSource: DataSource,
    private readonly redisClient: RedisClientType,
    private readonly storeId: string
  ) {}

  public buildCategoryRepository(manager?: EntityManager): CategoryRepository {
    return new CategoryRepositoryImpl(
      this.getManager(manager).getRepository(CategoryDao),
      this.dataMapperFactory.buildCategoryDataMapper(),
      this.storeId
    )
  }

  buildStockRepository(manager: EntityManager): StockRepository {
    return new StockRepositoryImpl(
      this.getManager(manager).getRepository(StockDao),
      this.dataMapperFactory.buildStockDataMapperMediator(),
      this.storeId
    )
  }

  public buildAttributeRepository(manager?: EntityManager): AttributeRepository {
    return new AttributeRepositoryImpl(
      this.getManager(manager).getRepository(AttributeDao),
      this.dataMapperFactory.buildAttributeDataMapper(),
      this.storeId
    )
  }

  public buildProductRepository(manager?: EntityManager) {
    return new ProductRepositoryImpl(
      this.getManager(manager).getRepository(ProductDao),
      this.dataMapperFactory.buildProductDataMapperMediator(),
      this.storeId
    )
  }

  public buildBrandRepository(manager?: EntityManager): BrandRepository {
    return new BrandRepositoryImpl(
      this.getManager(manager).getRepository(BrandDao),
      this.dataMapperFactory.buildBrandDataMapper(),
      this.storeId
    )
  }

  public buildWarehouseRepository(manager?: EntityManager): WarehouseRepository {
    return new WarehouseRepositoryImpl(
      this.getManager(manager).getRepository(WarehouseDao),
      this.dataMapperFactory.buildWarehouseDataMapper(),
      this.storeId
    )
  }

  public buildImageRepository(manager?: EntityManager): ImageRepository {
    return new ImageRepositoryImpl(
      this.getManager(manager).getRepository(ImageDao),
      this.dataMapperFactory.buildImageDataMapper(),
      this.storeId
    )
  }

  public buildPriceRepository(manager?: EntityManager): PriceRepository {
    return new PriceRepositoryImpl(
      this.getManager(manager).getRepository(PriceDao),
      this.dataMapperFactory.buildPriceDataMapperMediator(),
      this.storeId
    )
  }

  public buildVariationAttributeRepository(manager?: EntityManager): VariationAttributeRepository {
    return new VariationAttributeRepositoryImpl(
      this.getManager(manager).getRepository(VariationAttributeDao),
      this.dataMapperFactory.buildVariationAttributeDataMapperMediator(),
      this.storeId
    )
  }

  public buildCategoryTreeCacheRepository(): CategoryTreeCacheRepository {
    return new CategoryTreeCacheRepositoryImpl(
      this.getRedisClient(),
      this.dataMapperFactory.buildCategoryTreeCacheDataMapper(),
      this.storeId
    )
  }

  public buildVariationRepository(manager?: EntityManager): VariationRepository {
    return new VariationRepositoryImpl(
      this.getManager(manager).getRepository(VariationDao),
      this.dataMapperFactory.buildVariationDataMapperMediator(),
      this.storeId
    )
  }

  public buildUserRepository(manager?: EntityManager): UserRepository {
    return new UserRepositoryImpl(
      this.getManager(manager).getRepository(UserDao),
      this.dataMapperFactory.buildUserDataMapperMediator(),
      this.storeId
    )
  }

  public buildStoreRepository(manager?: EntityManager): StoreRepository {
    return new StoreRepositoryImpl(
      this.getManager(manager).getRepository(StoreDao),
      this.dataMapperFactory.buildStoreDataMapperMediator(),
      this.storeId
    )
  }

  public buildAuthenticationRepository(): AuthenticationRepository {
    return new AuthenticationRepositoryImpl(
      this.getRedisClient(),
      this.dataMapperFactory.buildAuthenticationDataMapper(),
      this.storeId
    )
  }

  public getDataSource() {
    return this.dataSource
  }

  public getRedisClient() {
    return this.redisClient
  }

  private getManager(manager?: EntityManager) {
    if (manager) return manager

    return this.dataSource.manager
  }
}
