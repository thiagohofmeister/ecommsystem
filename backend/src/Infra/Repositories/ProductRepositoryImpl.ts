import { SelectQueryBuilder } from 'typeorm'

import { Product } from '../../Domain/Product/Models/Product'
import { ProductRepository } from '../../Domain/Product/Repositories/ProductRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { ProductDao } from '../Models/ProductDao'

export class ProductRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Product, ProductDao>
  implements ProductRepository
{
  protected customToFindOneByPrimaryColumn(
    query: SelectQueryBuilder<ProductDao>
  ): SelectQueryBuilder<ProductDao> {
    return this.applyDefaultJoins(query)
  }

  protected customToFindAll(query: SelectQueryBuilder<ProductDao>): SelectQueryBuilder<ProductDao> {
    return this.applyDefaultJoins(query)
  }

  private applyDefaultJoins(query: SelectQueryBuilder<ProductDao>) {
    return query
      .leftJoinAndSelect('ProductDao.category', 'category')
      .leftJoinAndSelect('ProductDao.variations', 'variations')
      .leftJoinAndSelect('variations.stocks', 'stocks')
      .leftJoinAndSelect('variations.prices', 'prices')
      .leftJoinAndSelect('stocks.warehouse', 'warehouse')
      .leftJoinAndSelect('ProductDao.brand', 'brand')
      .leftJoinAndSelect('ProductDao.images', 'images')
      .leftJoinAndSelect('variations.variationAttributes', 'variationAttributes')
      .leftJoinAndSelect('variationAttributes.attribute', 'attribute')
      .leftJoinAndSelect('variationAttributes.variation', 'variation')
  }
}
