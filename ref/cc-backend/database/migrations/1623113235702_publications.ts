import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Publications extends BaseSchema {
  protected tableName = 'publications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.string('title', 500).notNullable()

      table.string('subtitle', 500).notNullable()

      table.text('content').notNullable()

      table.text('image').nullable()

      table.text('video').nullable()

      table.enum('type_publication', ['news', 'article']).notNullable()

      table.enum('state_publication', ['approved', 'votes', 'disapproved']).notNullable()

      table
        .uuid('author_id')
        .unsigned()
        .references('users.id')
        .onUpdate('cascade')
        .onDelete('cascade')
        .notNullable()

      table.timestamp('published_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
