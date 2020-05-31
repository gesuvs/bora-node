import { HttpEffect, HttpError, HttpStatus } from "@marblejs/core";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of, throwError } from "rxjs";
import { create } from "../../models/QRCode/qr-code.models";

export const qrCodeEffects$: HttpEffect = (req$) =>
  req$.pipe(
    mergeMap((req) =>
      of(req).pipe(
        map((req) => req.body, console.log(req.body)),
        mergeMap(create),
        map(({ code }) => ({
          status: HttpStatus.CREATED,
          body: { code },
        })),
        catchError((err) =>
          throwError(new HttpError(err, HttpStatus.BAD_REQUEST))
        )
      )
    )
  );
