import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomMessageErrorException from 'App/Exceptions/CustomMessageErrorException'

import User from 'App/Models/User'
import Publication from 'App/Models/Publication'
import Category from 'App/Models/Category'

import PageValidator from "App/Validators/PageValidator"
import ByIdValidator from "App/Validators/ByIdValidator"
import FavoritePublicationValidator from 'App/Validators/Favorites/FavoritePublicationValidator'
import FavoriteCategoryValidator from 'App/Validators/Favorites/FavoriteCategoryValidator'
import FavoriteParamValidator from 'App/Validators/Favorites/FavoriteParamValidator'

export default class FavoritesController {

  public async indexCategories({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)
      await request.validate(PageValidator)

      const { id, page = 1, perPage = 10 } = params


      response.ok(
        await User
          .query()
          .preload('favoritesCategories')
          .where('id', id)
          .paginate(page, perPage)
      )
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }

  }

  public async addCategories({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(FavoriteCategoryValidator)

      const { categoryId, userId } = request.only(['categoryId', 'userId'])

      const user: User = await User.findOrFail(userId)

      await user
        .related('favoritesCategories')
        .save(await Category.findOrFail(categoryId))


      response.ok(
        await User
          .query()
          .preload(
            'favoritesCategories',
            q => q.wherePivot('category_id', categoryId)
          )
          .first()
      )
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async showCategories({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'favoritesCategories'

      await request.validate(FavoriteParamValidator)

      response.ok(
        await User
          .query()
          .where('id', params.userId)
          .whereDoesntHave(
            'favoritesCategories',
            q => q.wherePivot('category_id', params.categoryId)
          )
          .firstOrFail()
      )
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async removeCategories({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'favoritesCategories'

      await request.validate(FavoriteParamValidator)


      const user: User = await User.findOrFail(params.userId)

      await user.related('favoritesCategories').detach([params.categoryId]);

      response.ok({ deleted: true })
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }


  public async indexPublications({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)
      await request.validate(PageValidator)

      const { id, page = 1, perPage = 10 } = params

      response.ok(
        await User
          .query()
          .preload('favoritesPublications')
          .where('id', id)
          .paginate(page, perPage)
      )
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async addPublications({ request, response }: HttpContextContract): Promise<void> {
    try {
      await request.validate(FavoritePublicationValidator)

      const { userId, publicationId } = request.only(['userId', 'publicationId'])

      const user: User = await User.findOrFail(userId)

      await user
        .related('favoritesPublications')
        .save(await Publication.findOrFail(publicationId))


      response.ok(
        await User
          .query()
          .preload(
            'favoritesPublications',
            q => q.wherePivot('publication_id', publicationId)
          )
          .first()
      )
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async showPublications({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'favoritesPublications'

      await request.validate(FavoriteParamValidator)

      response.ok(
        await User
          .query()
          .where('id', params.userId)
          .whereHas(
            'favoritesPublications',
            q => q.wherePivot('publication_id', params.publicationId)
          )
          .firstOrFail()

      )
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async removePublications({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'favoritesPublications'

      await request.validate(FavoriteParamValidator)

      const user = await User.findOrFail(params.userId)

      await user.related('favoritesPublications').detach([params.publicationId]);


      response.ok({ deleted: user.$isDeleted })
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }
}
