import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class EventosModels extends BaseSchema {
  protected $tableName = 'eventos_models';

  public async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    this.schema.createTable(this.$tableName, async table => {
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
      table.boolean('is_public').defaultTo(true);
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
