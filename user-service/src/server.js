import express from 'express';
import './database';
import { configServerApp } from './config/server';
import { routes } from './routes';
import { logger } from './logs';
import { swagger } from './docs';

export const app = express();

app.set(
  logger.log({
    level: 'info',
    message: 'Started 🔺',
  })
);

app.use(configServerApp);
app.use(routes);
app.use(swagger);
