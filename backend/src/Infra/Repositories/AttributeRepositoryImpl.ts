import { Attribute } from '../../Domain/Attribute/Models/Attribute'
import { AttributeRepository } from '../../Domain/Attribute/Repositories/AttributeRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { AttributeDao } from '../Models/AttributeDao'

export class AttributeRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Attribute, AttributeDao>
  implements AttributeRepository
{
  async findAllByIds(ids: string[]): Promise<Attribute[]> {
    const query = await this.repository
      .createQueryBuilder()
      .where({ storeId: this.storeId })
      .where('id IN (:ids)', { ids })

    return (await this.getMany(query)).items
  }
}
