import { promises as fs } from 'fs';

export const privateKey = async () =>
  await fs.readFile('jwtRS256.key', 'utf-8');

export const publicKey = async () =>
  await fs.readFile('jwtRS256.key.pub', 'utf-8');
