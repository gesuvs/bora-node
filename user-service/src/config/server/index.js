import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import session from 'express-session';

export const configServerApp = express();

configServerApp.enable('trust proxy');
configServerApp.use(cors());
configServerApp.use(express.json());
configServerApp.use(helmet());
configServerApp.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'mudar para variavel de ambiente',
    key: 'cookien session mudar para variavel de ambiente',
    cookie: {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now + 60 * 60 * 1000),
    },
  })
);
configServerApp.use(
  new RateLimit({
    store: new RateLimitRedis({
      client: redis.createClient({
        host: process.env.HOST_REDIS,
        port: process.env.PORT_REDIS,
      }),
    }),
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: {
      error: 'Too many requests, please try again later.',
    },
  })
);
configServerApp.use(compression());
configServerApp.disable('x-powered-by');
