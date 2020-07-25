import { httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { qrCode$, healthcheck$ } from '../routes';

const middlewares = [logger$(), bodyParser$()];

const effects = [qrCode$,healthcheck$];

export const listener = httpListener({
  middlewares,
  effects,
});
