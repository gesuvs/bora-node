import 'reflect-metadata';
import express from 'express';
import routes from './routes';

const app = express()

app.use(express.json());
app.use('/eventos', routes);
app.listen(5555, '0.0.0.0');
