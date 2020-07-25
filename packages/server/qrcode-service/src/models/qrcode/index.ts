import { QRCode } from '../../entity/qrcode';
import { QRCodeI, RequestHTTPI } from '../../interface';
import { getConnection } from 'typeorm';
import { from, Observable } from 'rxjs';

export const create = (qrCode: QRCodeI): Observable<QRCode> =>
  from(getConnection().getRepository(QRCode).save(qrCode));

export const getQRCode = (request: RequestHTTPI): Observable<QRCode> => {
  const {
    params: { id },
  } = request;

  return from(
    getConnection().getRepository(QRCode).findOneOrFail({
      where: { id },
    })
  );
};
