import { DateTime } from 'luxon';
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidv4 } from 'uuid';

export default class EventoParticipantesModel extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public username: string;

  @column({ columnName: 'evento_id' })
  public evento: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async uuidId(
    eventoParticipante: EventoParticipantesModel
  ): Promise<void> {
    eventoParticipante.id = uuidv4();
  }
}
