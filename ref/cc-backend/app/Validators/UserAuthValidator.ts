import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserAuthValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api

  public schema = schema.create({
		email: schema.string({ trim: true }, [ rules.email() ]),

		password: schema.string({
			trim: true
		}),

		remember_me_token: schema.string.optional({
			trim: true
		})
  })

  public messages = {
		required: '{{ field }} required field',
		string: '{{ field }} not a {{ rule }}'
	}
}
