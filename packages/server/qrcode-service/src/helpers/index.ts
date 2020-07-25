import * as fs from 'fs';
import * as util from 'util';
import { QRCodeToDataURLOptions, toDataURL } from 'qrcode';
import { Observable, from, throwError } from 'rxjs';
import { TokenValidationI } from '../interface';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { HttpError, HttpStatus, r } from '@marblejs/core';
import { verify } from 'jsonwebtoken';

const options = (scale: number) => {
  const obj: QRCodeToDataURLOptions = {
    scale,
  };
  return obj;
};

export const generateQRCode = (code: string, scale: number): Promise<string> =>
  new Promise(resolve => resolve(toDataURL(code, options(scale))));

export const readFile = util.promisify(fs.readFile);

export const pubKey$ = (token: string): Observable<TokenValidationI> =>
  from(
    new Promise<string>(resolve =>
      resolve(readFile('.ssh/jwtRS256.key.pub', 'utf-8'))
    ).then(res => {
      const obj: TokenValidationI = {
        publicKey: res,
        token: token,
      };
      return obj;
    })
  );

export const pubKey = (token: string): TokenValidationI => {
  const publicKey = fs.readFileSync('.ssh/jwtRS256.key.pub', 'utf-8');
  const obj: TokenValidationI = {
    publicKey,
    token,
  };
  return obj;
};

export const validateToken = ({
  publicKey,
  token,
}: TokenValidationI): string => {
  const getToken = token?.split(' ')[1];
  try {
    verify(getToken, publicKey, { algorithms: ['RS256'] }, err => {
      if (err) {
        throw new HttpError(err.message, HttpStatus.UNAUTHORIZED);
      }
    });
    return getToken;
  } catch (error) {
    throwError(new HttpError(error, HttpStatus.UNAUTHORIZED));
  }
};

export const validate$ = r.pipe(
  r.useEffect(req$ =>
    req$.pipe(
      map(({ headers: { authorization } }) => authorization),
      mergeMap(pubKey$),
      map(validateToken),
      map(body => ({ body })),
      catchError(err => throwError(new HttpError(err, HttpStatus.UNAUTHORIZED)))
    )
  )
);
