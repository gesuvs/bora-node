import 'dotenv/config';
import { middlewares } from './middlewares';
import express from 'express';
import { routes } from './routes';

const app = express();

app.use(middlewares);
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Escutando na porta:  ${process.env.PORT} 🚀`);
});
