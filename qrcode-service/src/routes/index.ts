import { r } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';
import { qrCodeEffects$ } from '../effects/qrcode';

export const api$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ => req$.pipe(mapTo({ body: 'Hello, world!' })))
);

export const createQRCode$ = r.pipe(
  r.matchPath('/qr-code'),
  r.matchType('POST'),
  r.useEffect(qrCodeEffects$)
);
