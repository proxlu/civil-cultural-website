import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatePublicationsEnum, TypePublicationsEnum } from 'Contracts/models'

export default class UpdatePublicationValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api
	
  public schema = schema.create({
    title: schema.string.optional({
      trim: true
    }),

    subtitle: schema.string.optional({
      trim: true
    }),

    content: schema.string.optional({
      trim: true
    }),

    image: schema.file.optional({
      size: '5mb',
      extnames: ['png','jpg','jpeg','bmp','gif','diff']
    }),

    video: schema.file.optional({
      size: '10mb',
      extnames: ['mp4','m4v','mov','avi']
    }),

    typePublication: schema.enum.optional(
      Object.values(TypePublicationsEnum)
    ),

    statePublication: schema.enum.optional(
      Object.values(StatePublicationsEnum)
    ),

    authorId: schema.string.optional(
      { trim: true },
      [ rules.uuid() ]
    ),

    categories: schema.array.optional().members(schema.number())
  })

	
  public messages = {
    required: '{{ field }} required field',
    enum: '{{ field }} not type {{ options }}'
  }
}
