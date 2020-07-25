import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { create, getQRCode } from '../../models/qrcode/';
import { generateQRCode } from '../../helpers';

export const createQRCodeEffects$: HttpEffect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        map(({ body }) => body),
        mergeMap(create),
        mergeMap(({ code, scale }) =>
          generateQRCode(String(code), Number(scale || 4))
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

export const getQRCodeEffects$: HttpEffect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        map(({ params }) => params),
        mergeMap(getQRCode),
        mergeMap(({ code, scale }) =>
          generateQRCode(String(code), Number(scale || 4))
        ),
        map(body => ({
          status: HttpStatus.ACCEPTED,
          body,
        })),
        catchError(err =>
          throwError(new HttpError(err?.message, HttpStatus.BAD_REQUEST))
        )
      )
    )
  );
