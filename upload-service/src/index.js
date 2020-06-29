require("dotenv").config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});

const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const { Kafka, logLevel } = require("kafkajs");

const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Conectado");
  });

const kafka = new Kafka({
  clientId: "api",
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
  logLevel: logLevel.ERROR,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.producer = producer;
  return next();
});
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use("/upload", routes);

async function run() {
  await producer.connect().then(console.log).catch(console.error);
  app.listen(process.env.APP_PORT, process.env.HOST, () => {
    console.log(`Run: ${process.env.HOST}:${process.env.APP_PORT}`);
  });
}
run().catch(console.error);
