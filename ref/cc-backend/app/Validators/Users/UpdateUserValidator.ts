import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public reporter = validator.reporters.api
	
  public schema = schema.create({
	name: schema.string.optional({ trim: true }),

	email: schema.string.optional(
		{ trim: true }, 
		[ rules.email(), rules.unique({ table: 'users', column: 'email' }) ]
	),

	password: schema.string.optional({ trim: true }),

	birthday: schema.date.optional(),

	language: schema.string.optional({ trim: true }),

	workCareer: schema.string.optional({ trim: true }),

	phoneNumber: schema.number.optional(),

	phoneFixNumber: schema.number.optional(),

	personalIdentification: schema.string.optional({ trim: true }),

	country: schema.string.optional({ trim: true }),

	cep: schema.number.optional(),

	city: schema.string.optional({ trim: true }),

	state: schema.string.optional({ trim: true }),

	address: schema.string.optional({ trim: true }),

	number: schema.number.optional()
  })

  	public messages = {
		string: '{{ field }} not a {{ rule }}',
		number: '{{ field }} not a {{ rule }}',
		maxLength: '{{ field }} max length is {{ rule }}',
		unique: '{{ field }} already exists',
		email: '{{ field }} not a valid email',
	}
}
