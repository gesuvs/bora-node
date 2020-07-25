import 'reflect-metadata';
import { config } from 'dotenv';
import { createServer } from '@marblejs/core';
import { IO } from 'fp-ts/lib/IO';
import { listener } from './config/listener';

import { database } from './database';

config();

const server = createServer({
  port: Number(process.env.PORT),
  hostname: process.env.HOST,
  listener,
});

const main: IO<void> = async () => await (await server)();
database.then(async () => main()).catch(console.error);
