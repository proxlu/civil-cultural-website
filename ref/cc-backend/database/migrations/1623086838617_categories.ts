import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name', 500).unique('category_unique_name').notNullable()

      table.text('description').notNullable()

      table.text('image').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
