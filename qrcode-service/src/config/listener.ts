import { httpListener } from '@marblejs/core';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import {qrCode$ } from '../routes';

const middlewares = [logger$(), bodyParser$()];

const effects = [qrCode$];

export const listener = httpListener({
  middlewares,
  effects,
});
