import { EntityDataMapperContract } from '../../Shared/DataMappers/Contracts/EntityDataMapperContract'

export class AuthenticationDataMapper extends EntityDataMapperContract<[], []> {
  toDomainEntity(entity: []): [] {
    return entity
  }

  toDaoEntity(domain: []): [] {
    return domain
  }
}
