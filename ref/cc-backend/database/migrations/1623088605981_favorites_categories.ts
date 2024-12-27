import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FavoritesCategories extends BaseSchema {
  protected tableName = 'favorites_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
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
