import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class EventosUsuarios extends BaseSchema {
  protected $tableName = 'evento_participantes_models';

  public async up() {
    this.schema.createTable(this.$tableName, table => {
      table.uuid('id').primary();
      table.uuid('evento_id').notNullable();
      table.string('username').notNullable();
      table.foreign('evento_id').references('id').inTable('eventos_models');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.$tableName);
  }
}
