import { SelectQueryBuilder } from 'typeorm'

import { Price } from '../../Domain/Product/Models/Price'
import { PriceRepository } from '../../Domain/Product/Repositories/PriceRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { PriceDao } from '../Models/PriceDao'

export class PriceRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Price, PriceDao>
  implements PriceRepository
{
  async findBySkuAndCampaignId(sku: string, campaignId: string): Promise<Price> {
    const query = this.repository
      .createQueryBuilder()
      .where(`${this.getTableName()}.store_id = :storeId`)
      .andWhere(`${this.getTableName()}.variation_sku = :sku`)
      .andWhere(`${this.getTableName()}.campaign_id ${!!campaignId ? '= :campaignId' : 'IS NULL'}`)
      .leftJoinAndSelect('PriceDao.variation', 'variation')
      .setParameters({ sku, storeId: this.storeId, campaignId })

    return this.getOne(query)
  }

  protected customToFindOneByPrimaryColumn(
    query: SelectQueryBuilder<PriceDao>
  ): SelectQueryBuilder<PriceDao> {
    return query.leftJoinAndSelect('PriceDao.variation', 'variation')
  }
}
