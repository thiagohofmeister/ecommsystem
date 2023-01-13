import { Store } from '../../Domain/Store/Models/Store'
import { StoreRepository } from '../../Domain/Store/Repositories/StoreRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { StoreDao } from '../Models/StoreDao'

export class StoreRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Store, StoreDao>
  implements StoreRepository
{
  async findOneByDocumentNumber(documentNumber: string): Promise<Store> {
    return this.getOne({ where: { documentNumber } })
  }
}
