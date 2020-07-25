import { r, combineRoutes, use } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';
import { createQRCodeEffects$, getQRCodeEffects$ } from '../effects/qrcode';
import { authorize$ } from '../validations';

export const healthcheck$ = r.pipe(
  r.matchPath('/healthcheck'),
  r.matchType('GET'),
  r.useEffect(req$ => req$.pipe(mapTo({ body: "healthcheck:'ok'" })))
);

const getQRCode$ = r.pipe(
  r.matchPath('/:id'),
  r.matchType('GET'),
  r.useEffect(getQRCodeEffects$)
);

const createQRCode$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(createQRCodeEffects$)
);

export const qrCode$ = combineRoutes('/qr-code', {
  middlewares: [authorize$],
  effects: [createQRCode$, getQRCode$],
});
