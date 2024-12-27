import { ResourceMethods } from '@ioc:Adonis/Core/Resource'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomMessageErrorException from 'App/Exceptions/CustomMessageErrorException'

import Category from 'App/Models/Category'

import PageValidator from 'App/Validators/PageValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import CategoryValidator from 'App/Validators/Categories/CategoryValidator'
import UpdateCategoryValidator from 'App/Validators/Categories/UpdateCategoryValidator'

export default class CategoriesController implements ResourceMethods {

  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(PageValidator)

      response.ok(
        await Category
          .query()
          .select('*')
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

  public async create({ request, response }: HttpContextContract): Promise<void> {

    try {
      await request.validate(CategoryValidator)

      response.ok(await Category.create(Object(request.all())))
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async show({ request, response, params: { id } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(ByIdValidator)

      response.ok(await Category.findOrFail(id))
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async update({ request, response, params: { id } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(ByIdValidator)
      await request.validate(UpdateCategoryValidator)

      const props = request.all()
      const categoryUpdate = await Category.findOrFail(id)

      for (let i in props)
        categoryUpdate[i] = props[i]

      response.ok(await categoryUpdate.save())
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async destroy({ request, response, params: { id } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(ByIdValidator)

      let category = await Category.findOrFail(id)

      await category.delete()

      response.ok({ deleted: category.$isDeleted })
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async publications({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)
      await request.validate(PageValidator)

      const { id, page = 1, perPage = 10 } = params

      response.ok(
        await Category
          .query()
          .preload('publications')
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
}
