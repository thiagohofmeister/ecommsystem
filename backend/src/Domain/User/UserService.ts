import { UnauthorizedException } from '../../Shared/Models/Exceptions/UnauthorizedException'
import { AuthenticationCreateDto } from '../Authentication/Dto/AuthenticationCreateDto'
import { UserCreateDto } from './Dto/UserCreateDto'
import { UserDataNotFound } from './Exceptions/UserDataNotFound'
import { User } from './Models/User'
import { UserRepository } from './Repositories/UserRepository'
import { UserValidator } from './UserValidator'

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: UserValidator
  ) {}

  async getById(id: string) {
    const result = await this.repository.findOneByPrimaryColumn(id)

    if (!result) throw new UserDataNotFound()

    return result
  }

  async findOneByAuthData(data: AuthenticationCreateDto) {
    const user = await this.repository.findOneByAuthData(data.login, data.password)

    if (user) return user

    throw new UnauthorizedException()
  }

  public async create(data: UserCreateDto): Promise<User> {
    await this.validator.userCreatePayloadValidate(data)

    return this.repository.save(new User(data.name, data.documentNumber, data.email, data.password))
  }

  public async findOneByDocumentNumber(documentNumber: string): Promise<User> {
    return this.repository.findOneByDocumentNumber(documentNumber)
  }
}
