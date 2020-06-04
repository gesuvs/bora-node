import { app } from './server';
import { config } from 'dotenv';

config({
  path:
    process.env.NODE_ENV === 'dev'
      ? '.env.dev'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env',
});

console.log(process.env.NODE_ENV)
app.listen(8888, '0.0.0.0');
