import { IRepository } from '../../../Shared/Models/Interfaces/IRepository'
import { Store } from '../Models/Store'

export interface StoreRepository extends IRepository<Store> {
  findOneByDocumentNumber(documentNumber: string): Promise<Store>
}
