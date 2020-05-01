import { config } from 'dotenv';
config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

import express from 'express';
import './database';
import { configServerApp } from './config/server';
import { routes } from './routes';

const app = express();

app.use(configServerApp);
app.use(routes);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta:  ${process.env.PORT} 🚀`);
});
