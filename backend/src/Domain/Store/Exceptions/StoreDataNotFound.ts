import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'

export class StoreDataNotFound extends DataNotFoundException {
  constructor() {
    super('Store data not found.')
  }
}
