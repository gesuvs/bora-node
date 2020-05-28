import { httpListener } from "@marblejs/core";
import { logger$ } from "@marblejs/middleware-logger";
import { bodyParser$ } from "@marblejs/middleware-body";
import { api$,teste$ } from "../routes";

const middlewares = [logger$(), bodyParser$()];

const effects = [api$,teste$];

export const listener = httpListener({
  middlewares,
  effects,
});
