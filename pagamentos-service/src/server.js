import { config } from 'dotenv';
import express from 'express';
import './database';
import { configServerApp } from './config/server';
import { routes } from './routes';
import { logger } from './logs';

config({
  path:
    process.env.NODE_ENV === 'dev'
      ? '.env.dev'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env',
});

export const app = express();

app.set(
  logger.log({
    level: 'info',
    message: `Started 🔺 on ${process.env.HOST}:${process.env.USER_PORT} || ${process.env.POSTGRES_HOST}`,
  })
);

console.log(process.env.NODE_ENV)
app.use(configServerApp);
app.use('/pagamentos', routes);
