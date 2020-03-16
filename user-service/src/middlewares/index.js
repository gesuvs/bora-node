import express from 'express';
import cors from 'cors';
import compression from 'compression';

export const middlewares = express();

middlewares.use(cors());
middlewares.use(express.json());
middlewares.use(compression());
middlewares.disable('x-powered-by');
