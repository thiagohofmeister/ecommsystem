import { IRepository } from '../../../Shared/Models/Interfaces/IRepository'
import { RedisCollection } from '../../../Shared/Models/RedisCollection'

export interface AuthenticationRepository extends IRepository<RedisCollection<any[]>> {}
