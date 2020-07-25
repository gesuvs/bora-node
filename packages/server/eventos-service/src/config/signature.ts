import * as fs from 'fs';
import * as path from 'path';

export const privateKey = async (): Promise<string> =>
  fs.readFileSync(
    path.resolve(__dirname, '..', '..', '.ssh/jwtRS256.key'),
    'utf-8'
  );
// fs.readFile('.ssh/jwtRS256.key', 'utf-8', () => {});

export const publicKey = async (): Promise<string> =>
  fs.readFileSync(
    path.resolve(__dirname, '..', '..', '.ssh/jwtRS256.key.pub'),
    'utf-8'
  );
