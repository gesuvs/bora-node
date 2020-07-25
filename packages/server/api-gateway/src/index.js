import "dotenv/config";
import { createServer } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "./routes";

const app = express();
const secret = "secret";

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(userRoutes);

createServer(app).listen(7777, () => console.log("Running"));
