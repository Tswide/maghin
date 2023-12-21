import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddCategoryIdToCours extends BaseSchema {
  protected tableName = 'pics'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('category_pics_id')
        .unsigned()
        .references('categories.id')
        .onDelete('SET NULL')
        .nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category_pics_id')
    })
  }
}
