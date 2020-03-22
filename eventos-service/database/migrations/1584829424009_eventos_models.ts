import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class EventosModels extends BaseSchema {
  protected $tableName = 'eventos_models';

  public async up() {
    this.schema.createTable(this.$tableName, (table) => {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.string('owner').notNullable();
      table
        .enum('roles', [
          'public',
          'private',
          'only frinds',
          'only friends of friends',
        ])
        .defaultTo('public');
      table.boolean('isPublic');
      table.string('password');
      table.date('start_day').notNullable();
      table.date('start_end').notNullable();
      table.time('start_time');
      table.time('end_time');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.$tableName);
  }
}
