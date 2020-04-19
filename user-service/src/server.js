import 'dotenv/config';
import express from 'express';
import './database';
import { middlewares } from './middlewares';
import { routes } from './routes';

const app = express();

app.use(middlewares);
app.set('secretKey', 'nodeRestApi');
app.use(routes);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta:  ${process.env.PORT} 🚀`);
});
