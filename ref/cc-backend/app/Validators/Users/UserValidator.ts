import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public reporter = validator.reporters.api

	public schema = schema.create({
		name: schema.string({ trim: true }),

		email: schema.string(
			{ trim: true }, 
			[ rules.email(), rules.unique({ table: 'users', column: 'email' }) ]
		),

		password: schema.string({ trim: true }),

		birthday: schema.date(),

		language: schema.string({ trim: true }),

		workCareer: schema.string.optional({ trim: true }),

		phoneNumber: schema.number(),

		phoneFixNumber: schema.number.optional(),

		personalIdentification: schema.string({ trim: true }),

		country: schema.string({ trim: true }),

		cep: schema.number.optional(),

		city: schema.string({ trim: true }),

		state: schema.string({ trim: true }),

		address: schema.string({ trim: true }),

		number: schema.number(),

	})

	public messages = {
		required: '{{ field }} required field',
		string: '{{ field }} not a {{ rule }}',
		number: '{{ field }} not a {{ rule }}',
		maxLength: '{{ field }} max length is {{ rule }}',
		unique: '{{ field }} already exists',
		email: '{{ field }} not a valid email',
	}
}
