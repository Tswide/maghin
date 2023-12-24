import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddCategoryIdToPics extends BaseSchema {
  protected tableName = 'pics'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('categorie_pics_id')
        .unsigned()
        .references('categorie_pics.id')
        .onDelete('SET NULL')
        .nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('categorie_pics_id')
    })
  }
}
