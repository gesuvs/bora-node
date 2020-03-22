import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class EventosModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public owner: string;

  @column({})
  public roles: string;

  @column()
  public isPublic: boolean;

  @column()
  public password: string;

  @column({ columnName: 'start_day' })
  public startDay: Date;

  @column({ columnName: 'start_end' })
  public startEnd: Date;

  @column({ columnName: 'start_time' })
  public starTime: DateTime;

  @column({ columnName: 'end_time' })
  public endTime: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
