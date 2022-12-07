import { ConflictException } from '../../../Shared/Models/Exceptions/ConflictException'

export class WarehouseConflict extends ConflictException {
  constructor() {
    super('Warehouse already exists.')
  }
}
