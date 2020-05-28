import "dotenv/config";
import { createServer } from "@marblejs/core";
import { listener } from "./config/http.listener";
import { IO } from "fp-ts/lib/IO";

const server = createServer({
  port: Number(process.env.PORT),
  hostname: process.env.HOST,
  listener,
});

const main: IO<void> = async () => await (await server)();
main();
