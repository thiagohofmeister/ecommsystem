import { ConflictException } from '../../../Shared/Models/Exceptions/ConflictException'

export class ProductConflict extends ConflictException {
  constructor() {
    super('Product already exists.')
  }
}
