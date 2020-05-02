import { config } from 'dotenv';
import { app } from './server';

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

app.listen(process.env.PORT);
