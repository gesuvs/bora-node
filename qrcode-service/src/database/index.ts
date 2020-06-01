import { QRCode } from '../entity/QRCode';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';
config();

export const database = createConnection({
  type: 'postgres',
  name: 'default',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [QRCode],
});
