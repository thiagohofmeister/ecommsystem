import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'

export class VariationCurrentPriceDataNotFound extends DataNotFoundException {
  constructor() {
    super('VariationCurrentPrice data not found.')
  }
}
