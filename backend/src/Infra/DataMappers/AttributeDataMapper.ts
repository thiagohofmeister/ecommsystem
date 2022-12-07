import { Attribute } from '../../Domain/Attribute/Models/Attribute'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { AttributeDao } from '../Models/AttributeDao'

export class AttributeDataMapper extends EntityDataMapperContract<Attribute, AttributeDao> {
  toDomainEntity(entity: AttributeDao): Attribute {
    return new Attribute(entity.storeId, entity.label, entity.values, entity.id)
  }

  toDaoEntity(domain: Attribute): AttributeDao {
    return new AttributeDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getLabel(),
      domain.getValues()
    )
  }
}
