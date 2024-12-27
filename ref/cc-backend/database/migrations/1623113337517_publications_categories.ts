import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PublicationsCategories extends BaseSchema {
  protected tableName = 'publications_categories'

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
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onUpdate('cascade')
        .onDelete('cascade')
        .notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
