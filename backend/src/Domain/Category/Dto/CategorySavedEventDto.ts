import { IEventPayload } from '../../../Shared/Models/Interfaces/IEventPayload'

export interface CategorySavedEventDto extends IEventPayload {
  categoryId: string
}
