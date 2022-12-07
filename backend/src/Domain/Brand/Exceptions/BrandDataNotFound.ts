import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'

export class BrandDataNotFound extends DataNotFoundException {
  constructor() {
    super('Brand data not found.')
  }
}
