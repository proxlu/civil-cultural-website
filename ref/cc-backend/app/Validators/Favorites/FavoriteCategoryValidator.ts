import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FavoriteCategoryValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api

  public schema = schema.create({
		userId: schema.string({ trim: true }),
		categoryId: schema.number([ rules.unsigned() ])
  })

  public messages = {
		required: 'Required field {{ field }}',
		unsigned: 'Value {{ field }} cannot be negative',
		number: '{{ field }} not a number type'
	}
}
