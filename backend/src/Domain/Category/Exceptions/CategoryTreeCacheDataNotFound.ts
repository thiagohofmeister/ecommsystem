import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'

export class CategoryTreeCacheDataNotFound extends DataNotFoundException {
  constructor() {
    super('CategoryTreeCache data not found.')
  }
}
