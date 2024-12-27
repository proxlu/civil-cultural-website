import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TopicValidator {

  constructor (protected ctx: HttpContextContract) {
  }
  
  public reporter = validator.reporters.api

  public schema = schema.create({
    publicationId: schema.string({  trim: true }, [ rules.uuid() ])
  })

  public messages = {
    required: 'Required field {{ field }}',
    uuid: 'Not Type uuid'
  }
}
