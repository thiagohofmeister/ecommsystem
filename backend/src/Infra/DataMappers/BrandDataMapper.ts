import { Brand } from '../../Domain/Brand/Models/Brand'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { BrandDao } from '../Models/BrandDao'

export class BrandDataMapper extends EntityDataMapperContract<Brand, BrandDao> {
  toDomainEntity(entity: BrandDao): Brand {
    return new Brand(
      entity.storeId,
      entity.label,
      entity.urn,
      entity.description,
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Brand): BrandDao {
    return new BrandDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getLabel(),
      domain.getUrn(),
      domain.getDescription(),
      domain.getCreatedAt(),
      domain.getUpdatedAt()
    )
  }
}
