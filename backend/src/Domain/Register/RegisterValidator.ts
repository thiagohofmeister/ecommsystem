import * as Joi from 'joi'
import { Schema } from 'joi'

import { JoiSchemaValidatorContract } from '../../Shared/Validators/JoiSchemaValidatorContract'
import { RegisterCreateDto } from './Dto/RegisterCreateDto'

export class RegisterValidator extends JoiSchemaValidatorContract {
  private registerCreateSchema: Schema

  constructor() {
    super()

    this.registerCreateSchema = Joi.object({
      user: Joi.object().required(),
      store: Joi.object().required()
    })
  }

  public async registerCreatePayloadValidate(payload: RegisterCreateDto) {
    return this.validateBySchema<RegisterCreateDto>(payload, this.registerCreateSchema)
  }
}
