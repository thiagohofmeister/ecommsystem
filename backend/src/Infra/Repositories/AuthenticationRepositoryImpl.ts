import { AuthenticationRepository } from '../../Domain/Authentication/Repositories/AuthenticationRepository'
import { RedisClientRepositoryContract } from '../../Shared/Repositories/Contracts/RedisClientRepositoryContract'

export class AuthenticationRepositoryImpl
  extends RedisClientRepositoryContract<[]>
  implements AuthenticationRepository
{
  protected getKeyPrefix(): string {
    return 'auth'
  }
}
