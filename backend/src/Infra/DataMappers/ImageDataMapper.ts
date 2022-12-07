import { Image } from '../../Domain/Product/Models/Image'
import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'
import { ImageDao } from '../Models/ImageDao'

export class ImageDataMapper extends EntityDataMapperContract<Image, ImageDao> {
  toDomainEntity(entity: ImageDao): Image {
    return new Image(entity.url, entity.position, entity.value, entity.storeId, entity.id)
  }

  toDaoEntity(domain: Image): ImageDao {
    return new ImageDao(
      domain.getId(),
      domain.getStoreId(),
      domain.getUrl(),
      domain.getPosition(),
      domain.getValue()
    )
  }
}
