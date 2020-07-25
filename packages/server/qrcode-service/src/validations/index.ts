import { mergeMap } from 'rxjs/operators';
import { HttpStatus, HttpError, HttpMiddlewareEffect } from '@marblejs/core';
import { throwError, of } from 'rxjs';
import { pubKey, validateToken } from '../helpers';
import { IncomingHttpHeaders } from 'http';

function isAuthorized(data: IncomingHttpHeaders) {
  const { authorization } = data;
  if (authorization) {
    const res = pubKey(authorization);
    if (res) {
      const f = validateToken(res);
      if (f) {
        return true;
      }
    }
  } else {
    return false;
  }
}

export const authorize$: HttpMiddlewareEffect = req$ =>
  req$.pipe(
    mergeMap(req =>
      isAuthorized(req.headers)
        ? of(req)
        : throwError(new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED))
    )
  );
