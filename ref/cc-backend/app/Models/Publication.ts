import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import { StatePublicationsEnum, TypePublicationsEnum } from 'Contracts/models'
import PublicationsTopic from 'App/Models/PublicationsTopic'
import Category from 'App/Models/Category'

export default class Publication extends BaseModel {

  public static table = "publications"

  @column({ isPrimary: true })
  public id: string

  @column()
  public  title: string

  @column()
  public subtitle: string

  @column()
  public content: string

  @column()
  public image: string

  @column()
  public video: string

  @column()
  public typePublication: TypePublicationsEnum

  @column()
  public statePublication: StatePublicationsEnum

  @column()
  authorId: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public publishedAt: DateTime

  @hasOne(() => PublicationsTopic)
  public publicationsTopics: HasOne<typeof PublicationsTopic>

  @manyToMany(() => Category, {
    pivotTable: 'publications_categories',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'publication_id'
  })
  public categories: ManyToMany<typeof Category>
}
