import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

export const configServerApp = express();

console.log(process.env.USER_PORT);

configServerApp.use(cors());
configServerApp.use(express.json());
configServerApp.use(helmet());
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
