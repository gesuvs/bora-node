import express from 'express';
import './database';
import { configServerApp } from './config/server';
import { routes } from './routes';

export const app = express();

app.use(configServerApp);
app.use(routes);
