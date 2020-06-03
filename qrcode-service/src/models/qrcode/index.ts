/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { QRCode } from '../../entity/qrcode';
import { QRCodeI } from '../../interface';
import { getConnection } from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { IncomingHttpHeaders, IncomingMessage } from 'http';
import {
  HttpEffectResponse,
  HttpRequest,
  HttpError,
  HttpStatus,
} from '@marblejs/core';
import { catchError } from 'rxjs/operators';

interface Params {
  id: string;
}
export interface RequestParams {
  d: Params;
}

export const create = (qrCode: QRCodeI): Observable<QRCode> =>
  from(getConnection().getRepository(QRCode).save(qrCode));

export const getQRCode = (request): Observable<QRCode> => {
  const { id } = request;
  return from(
    getConnection().getRepository(QRCode).findOne({
      where: { id },
    })
  );
};
