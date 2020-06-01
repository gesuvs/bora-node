import { QRCodeToDataURLOptions, toDataURL } from 'qrcode';

const options = (scale: number) => {
  const obj: QRCodeToDataURLOptions = {
    scale,
  };
  return obj;
};

export const generateQRCode = (code: string, scale: number): Promise<string> =>
  new Promise(resolve => resolve(toDataURL(code, options(scale))));
