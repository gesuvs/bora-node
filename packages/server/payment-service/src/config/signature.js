import { promises as fs } from "fs";

export const privateKey = async string =>
  await fs.readFile(".ssh/jwtRS256.key", "utf-8");

export const publicKey = async string =>
  await fs.readFile(".ssh/jwtRS256.key.pub", "utf-8");
