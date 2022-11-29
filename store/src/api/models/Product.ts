import { MeasureUnitEnum } from './Enums/MeasureUnitEnum'
import { WeightUnitEnum } from './Enums/WeightUnitEnum'
import { ProductVariationTemplate } from './ProductVariationTemplate'

export interface ProductResponse {
  id: string
  title: string
  description: string
  variationTemplate: ProductVariationTemplate
  active: boolean
  category: {
    id: string
    urn: string
    label: string
  }
  brand: {
    id: string
    urn: string
    label: string
  }
  images: {
    id: string
    url: string
    value: string
  }[]
  variations: {
    sku: string
    width: number
    length: number
    height: number
    weight: number
    measuresUnit: MeasureUnitEnum
    weightUnit: WeightUnitEnum
    attributes: {
      attribute: {
        id: string
      }
      value: string
    }[]
    images: {
      id: string
      url: string
      value: string
    }[]
    price: {
      id: string
      list: number
      sale: number
      campaign?: {
        id: string
      }
    }
    stocks: {
      quantity: number
      warehouse: {
        id: string
      }
    }[]
    createdAt: Date
    updatedAt: Date
  }[]
  createdAt: Date
  updatedAt: Date
}
