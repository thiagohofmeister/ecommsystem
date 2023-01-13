import { Brand } from '../../Domain/Brand/Models/Brand'
import { BrandRepository } from '../../Domain/Brand/Repositories/BrandRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { BrandDao } from '../Models/BrandDao'

export class BrandRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Brand, BrandDao>
  implements BrandRepository
{
  async findOneByUrn(urn: string): Promise<Brand> {
    return this.getOne({
      where: { urn, storeId: this.storeId }
    })
  }
}
