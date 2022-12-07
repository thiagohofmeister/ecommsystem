import { Variation } from '../../Domain/Variation/Models/Variation'
import { VariationRepository } from '../../Domain/Variation/Repositories/VariationRepository'
import { TypeOrmMysqlRepositoryContract } from '../../Shared/Repositories/Contracts/TypeOrmMysqlRepositoryContract'
import { VariationDao } from '../Models/VariationDao'

export class VariationRepositoryImpl
  extends TypeOrmMysqlRepositoryContract<Variation, VariationDao>
  implements VariationRepository {}
