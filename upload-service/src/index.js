require("dotenv").config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use("/upload", routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Run: ${process.env.APP_PORT}`);
});
