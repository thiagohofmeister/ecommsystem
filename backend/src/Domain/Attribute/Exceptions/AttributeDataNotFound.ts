import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'

export class AttributeDataNotFound extends DataNotFoundException {
  constructor() {
    super('Attribute data not found.')
  }
}
