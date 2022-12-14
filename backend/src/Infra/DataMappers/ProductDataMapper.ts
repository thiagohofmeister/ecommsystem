import { Product } from '../../Domain/Product/Models/Product'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { ProductDao } from '../Models/ProductDao'

export class ProductDataMapper extends EntityDataMapperContract<Product, ProductDao> {
  toDomainEntity(entity: ProductDao): Product {
    return new Product(
      entity.storeId,
      entity.title,
      entity.description,
      entity.variationTemplate,
      entity.active,
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Product): ProductDao {
    return new ProductDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getTitle(),
      domain.getDescription(),
      domain.getVariationTemplate(),
      domain.isActive(),
      domain.getCreatedAt()
    )
  }
}
