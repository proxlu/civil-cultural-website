import { ResourceMethods } from '@ioc:Adonis/Core/Resource'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomMessageErrorException from 'App/Exceptions/CustomMessageErrorException'

import PageValidator from 'App/Validators/PageValidator'

import Publication from 'App/Models/Publication'
import PublicationsTopic from 'App/Models/PublicationsTopic'

import TopicValidator from 'App/Validators/PublicationsTopic/TopicValidator'
import ByIdValidator from 'App/Validators/ByIdValidator'
import UpdateTopicValidator from 'App/Validators/PublicationsTopic/UpdateTopicValidator'

export default class TopicsController implements ResourceMethods {
  public async index({ request, response, params: { page = 1, perPage = 10 } }: HttpContextContract): Promise<void> {
    try {
      await request.validate(PageValidator)

      response.ok(
        await Publication
          .query()
          .preload('publicationsTopics')
          .has('publicationsTopics')
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
      await request.validate(TopicValidator)

      const { publicationId } = request.only(['publicationId'])

      response.ok(await (await Publication.findOrFail(publicationId)).related('publicationsTopics').create({}))
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async show({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'
      await request.validate(ByIdValidator)

      response.ok(
        await Publication
          .query()
          .preload('publicationsTopics')
          .whereHas('publicationsTopics', q => q.where('id', params.id))
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

  public async update({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)
      await request.validate(UpdateTopicValidator)

      let publicationsTopic = await PublicationsTopic.findOrFail(params.id)
      publicationsTopic.publicationId = request.input('publicationId')


      response.ok(await publicationsTopic.save())
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }

  public async destroy({ request, response, params }: HttpContextContract): Promise<void> {
    try {
      params.type = 'string'

      await request.validate(ByIdValidator)

      let publicationsTopic = await PublicationsTopic.findOrFail(params.id)
      await publicationsTopic.delete()
      response.ok({ deleted: publicationsTopic.$isDeleted })
    } catch (error) {
      throw new CustomMessageErrorException(
        error.name === 'ValidationException' ? JSON.stringify(error.messages) : error.message,
        error.status ?? undefined,
        error.code ?? undefined,
      )
    }
  }
}
