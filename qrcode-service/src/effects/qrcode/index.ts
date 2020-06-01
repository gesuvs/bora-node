import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { create } from '../../models/QRCode/qr-code.models';
import { generateQRCode } from '../../models/QRCode';

export const qrCodeEffects$: HttpEffect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        // map((req) => req.body, console.log(req.query)),
        map(req => req.body),
        mergeMap(create),
        mergeMap(res =>
          generateQRCode(String(res.code), Number(res.scale || 4))
        ),
        map(body => ({
          status: HttpStatus.CREATED,
          body,
        })),
        catchError(err =>
          throwError(new HttpError(err, HttpStatus.BAD_REQUEST))
        )
      )
    )
  );
