import "reflect-metadata";
import "dotenv/config";
import { createServer } from "@marblejs/core";
import { IO } from "fp-ts/lib/IO";
import { listener } from "./config/http.listener";
import { createConnection } from "typeorm";

const server = createServer({
  port: Number(process.env.PORT),
  hostname: process.env.HOST,
  listener,
});

const main: IO<void> = async () => await (await server)();
createConnection().then(async (conn) => {
  console.log("conectado");
  main();
});
