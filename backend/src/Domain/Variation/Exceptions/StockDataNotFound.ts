import { DataNotFoundException } from '../../../Shared/Models/Exceptions/DataNotFoundException'

export class StockDataNotFound extends DataNotFoundException {
  constructor() {
    super('Stock data not found.')
  }
}
