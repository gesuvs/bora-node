import { QRCode } from '../../entity/QRCode';
import { QRCodeI } from '../../interface';
import { getConnection } from 'typeorm';
import { from, Observable } from 'rxjs';

export const create = (qrCode: QRCodeI): Observable<QRCode> =>
  from(getConnection().getRepository(QRCode).save(qrCode));
