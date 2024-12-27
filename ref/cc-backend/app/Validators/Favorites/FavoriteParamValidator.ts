import { schema , rules, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FavoritesCategoriesParam, FavoritesPublicationsParam } from 'Contracts/validators'

export default class FavoriteParamValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public data = <FavoritesCategoriesParam | FavoritesPublicationsParam>this.ctx.params

	public reporter = validator.reporters.api
	
  public schema = schema.create(this.typeFavoriteParam())

  protected typeFavoriteParam() {
		const typedSchema = { userId: schema.string({ trim: true }) }
		
		switch(this.data['type']) {
			case 'favoritesCategories':
				typedSchema['categoryId'] = schema.number([ rules.unsigned() ]) 
				break;
			case 'favoritesPublications':
				typedSchema['publicationId'] = schema.string({ trim: true })
				break;
			default:
				throw '\'type\' is undefined'
		}

		return typedSchema
	}

  public messages = {
		required: 'Required field {{ field }}',
		unsigned: 'Value {{ field }} cannot be negative',
		number: ' {{ field }} not a number type',
		rules: 'Numbers from 1 to 4 are accepted'
	}
}
