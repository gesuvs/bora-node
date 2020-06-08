import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

export const configServerApp = express();

configServerApp.use(cors());
configServerApp.use(express.json());
configServerApp.use(helmet());
configServerApp.use(compression());
configServerApp.disable('x-powered-by');
