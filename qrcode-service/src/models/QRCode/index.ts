import { QRCodeToDataURLOptions, toDataURL } from "qrcode";

import { from, Observable } from "rxjs";
import { option } from "fp-ts/lib/Option";

interface option<QRCodeToDataURLOptions> {
  scale: number;
}

const options = (scale: number) => {
  const obj: QRCodeToDataURLOptions = {
    scale,
  };
  return obj;
};


const qrString = "https://www.c-sharpcorner.com/blogs/generate-qrcode-in-node";

export const generateQRCode = (url: string, scale: number) =>
  new Promise((resolve) => resolve(toDataURL(url, options(scale))));



// console.log(options(15));
