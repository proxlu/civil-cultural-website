import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PublicationsTopics extends BaseSchema {
  protected tableName = 'publications_topics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))

      table
        .uuid('publication_id')
        .unique('publication_unique_id')
        .unsigned()
        .references('publications.id')
        .onUpdate('cascade')
        .onDelete('cascade')
        .notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
