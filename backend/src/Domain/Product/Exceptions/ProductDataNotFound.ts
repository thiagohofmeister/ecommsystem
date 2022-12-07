import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'

export class ProductDataNotFound extends DataNotFoundException {
  constructor() {
    super('Product data not found.')
  }
}
