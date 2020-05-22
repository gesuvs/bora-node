import { promises as fs } from 'fs';
import path from 'path';

export const privateKey = async (): Promise<string> =>
  await fs.readFile(
    path.resolve(__dirname, '..', '..', '..', '..', 'tls', 'jwtRS256.key'),
    'utf-8'
  );

export const publicKey = async (): Promise<string> =>
  await fs.readFile(
    path.resolve(__dirname, '..', '..', '..', '..', 'tls', 'jwtRS256.key.pub'),
    'utf-8'
  );
