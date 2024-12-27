import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PublicationsTopic extends BaseModel {
  public static table = 'publications_topics'

  @column({ isPrimary: true })
  public id: string

  @column()
  public publicationId: string
}
