import { ViewContract } from '../../../Shared/Views/Contracts/ViewContract'
import { IViewResponse } from '../../../Shared/Views/Interfaces/IViewResponse'
import { Attribute } from '../Models/Attribute'

export class AttributeView extends ViewContract<Attribute, AttributeResponse> {
  protected renderOne(entity: Attribute): AttributeResponse {
    return {
      id: entity.getId(),
      label: entity.getLabel(),
      values: entity.getValues()
    }
  }
}

export interface AttributeResponse extends IViewResponse {
  id: string
  label: string
  values: string
}
