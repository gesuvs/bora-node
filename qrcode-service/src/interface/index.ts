export interface QRCodeI {
  code: string;
  expireAt: Date;
}

export interface TokenValidationI {
  publicKey?: string;
  token?: string;
}
