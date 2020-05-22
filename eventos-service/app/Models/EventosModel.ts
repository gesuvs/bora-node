import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  beforeSave,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash';

export default class EventosModel extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

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

  @beforeSave()
  public static async hashPaswword(evento: EventosModel) {
    if (evento.$dirty.password)
      evento.password = await Hash.make(evento.password);
  }

  @beforeCreate()
  public static async uuidId(evento: EventosModel) {
    evento.id = uuidv4();
  }
}
