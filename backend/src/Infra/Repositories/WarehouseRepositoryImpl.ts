import { In, SelectQueryBuilder } from 'typeorm'

import { Warehouse } from '../../Domain/Warehouse/Models/Warehouse'
import { WarehouseRepository } from '../../Domain/Warehouse/Repositories/WarehouseRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { WarehouseDao } from '../Models/WarehouseDao'

export class WarehouseRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Warehouse, WarehouseDao>
  implements WarehouseRepository
{
  async findByIds(ids: string[]): Promise<Warehouse[]> {
    const query = await this.repository.createQueryBuilder().where({
      storeId: this.storeId,
      id: In(ids)
    })

    return (await this.getMany(query)).items
  }

  async getNextPriority(): Promise<number> {
    const last = (
      await this.repository.find({
        order: { priority: 'desc' },
        take: 1
      })
    )[0]

    if (!last) {
      return 0
    }

    return last.priority + 1
  }

  async findByZipCodeAndNumber(addressZipCode: string, addressNumber: string): Promise<Warehouse> {
    const query = await this.repository.createQueryBuilder().where({
      storeId: this.storeId,
      addressZipCode,
      addressNumber
    })

    return this.getOne(query)
  }

  protected customToFindAll(
    query: SelectQueryBuilder<WarehouseDao>
  ): SelectQueryBuilder<WarehouseDao> {
    return query.orderBy('priority', 'ASC')
  }
}
