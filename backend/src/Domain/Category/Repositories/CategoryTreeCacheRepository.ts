import { IRepository } from '../../../Shared/Models/Interfaces/IRepository'
import { RedisCollection } from '../../../Shared/Models/RedisCollection'
import { CategoryTree } from '../Models/CategoryTree'

export interface CategoryTreeCacheRepository extends IRepository<RedisCollection<CategoryTree[]>> {}
