import { QRCode } from "../../entity/QRCode";
import { IQRCode } from "../../interface";
import { getRepository, getConnection } from "typeorm";
import { from } from "rxjs";

export const create = (qrCode: IQRCode) =>
  from(getConnection().getRepository(QRCode).save(qrCode));
