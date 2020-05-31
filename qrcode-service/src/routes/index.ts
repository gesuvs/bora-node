import { r, EffectFactory } from "@marblejs/core";
import { mapTo, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { qrCodeEffects$ } from "../effects/qrcode";

export const api$ = r.pipe(
  r.matchPath("/"),
  r.matchType("GET"),
  r.useEffect((req$) => req$.pipe(mapTo({ body: "Hello, world!" })))
);

export const createQRCode$ = r.pipe(
  r.matchPath("/qr-code"),
  r.matchType("POST"),
  r.useEffect(qrCodeEffects$)
);

// export const createQRCode$ = r.pipe(
//   r.matchPath("/qr-code"),
//   r.matchType("POST"),
//   r.useEffect(qrCodeEffects$)
// );

// export const createQRCode$ = r.pipe(
//   r.matchPath("/qr-code"),
//   r.matchType("POST"),
//   r.use(qrCodeEffects$)
// r.useEffect((req$) =>
// req$.pipe(
//   mergeMap((res) =>
//     generateQRCode(String(res.body), Number(res.query || 0))
//   ),
//   map((body) => ({ body }))
// )
// )
