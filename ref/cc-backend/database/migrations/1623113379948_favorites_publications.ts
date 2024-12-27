import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FavoritesPublications extends BaseSchema {
  protected tableName = 'favorites_publications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('publication_id')
        .unsigned()
        .references('publications.id')
        .onUpdate('cascade')
        .onDelete('cascade')
        .notNullable()

      table
        .uuid('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('cascade')
        .onDelete('cascade')
        .notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
