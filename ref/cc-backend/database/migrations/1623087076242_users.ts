import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Crie a extensão para usar as função uuid_generate_v4()  
       * CREATE EXTENSION IF NOT EXISTS "uuid-ossp
       **/

      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))

      table.string('name', 300).notNullable()

      table.string('email', 300).unique('user_unique_email').notNullable()

      table.date('birthday').notNullable()

      table.string('password', 500).notNullable()

      table.string('language', 5).notNullable()

      table.text('work_career').nullable()

      table.integer('phone_number').notNullable()

      table.integer('phone_fix_number').nullable()

      table.text('personal_identification').notNullable()

      table.string('country', 300).notNullable()
      
      table.integer('cep', 8).nullable()

      table.string('city', 300).notNullable()

      table.string('state', 2).notNullable()

      table.string('address', 300).notNullable()
      
      table.integer('number').notNullable()

      table.enum('type_user', ['2540', '2680']).notNullable()

      table.timestamp('created_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
