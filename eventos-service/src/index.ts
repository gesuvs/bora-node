import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import routes from './routes';
import { Kafka } from 'kafkajs';
import { createClient } from 'redis';
config({
  path:
    process.env.NODE_ENV === 'development'
      ? '.env.dev'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env',
});

// const kafka = new Kafka({
//   brokers: [`${process.env.KAFKA_HOST}:${Number(process.env.KAFKA_PORT)}`],
//   clientId: 'upload',
// });

// export const redis = createClient({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
// });

// const topic = 'issue-upload';
// const consumer = kafka.consumer({ groupId: 'certificate-group' });
const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//   req.consumer = consumer;
//   return next();
// });
app.use('/eventos', routes);
async function run() {
  // await consumer.connect();
  // await consumer.subscribe({ topic });
  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     redis.set('event_code_url', message.value.toString('utf-8'));
  //   },
  // });
}
run().catch(console.error);
app.listen(Number(process.env.EVENTO_PORT), process.env.HOST, () => {
  console.log(`Started on: ${process.env.HOST}:${process.env.EVENTO_PORT}`);
});
