import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RuleNumberType, RuleStringType, ById } from 'Contracts/validators'

export default class ByIdValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public data = <ById>this.ctx.params
	public reporter = validator.reporters.api

	public schema  = schema.create({
		id: this.verifyTypeYbId() 
	})

	public messages = {
		required: 'Required field {{ field }}',
		unsigned: 'Value {{ field }} cannot be negative',
		number: '{{ field }} not a number type'
	}

	protected verifyTypeYbId(): RuleNumberType | RuleStringType 
	{
		switch(this.data['type']) {
			case 'number':
				return schema.number([	rules.unsigned() ])
			case 'string':
				return schema.string({ trim: true },[rules.required()])
			default:
				return schema.number([	rules.unsigned() ])
		}
	}
}
