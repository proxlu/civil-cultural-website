import { schema, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserLoginValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api

  public schema = schema.create({
		email: schema.string({ trim: true }),
		password: schema.string({ trim: true })
  })

  public messages = {}
}
