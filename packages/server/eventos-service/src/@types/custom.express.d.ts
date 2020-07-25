import { Consumer } from 'kafkajs';

declare global {
  namespace Express {
    export interface Request {
      consumer?: Consumer;
    }
  }
}
