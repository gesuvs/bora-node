const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const User = require("../documents/User");
const Event = require("../documents/Event");
const { CompressionTypes } = require("kafkajs");

routes.post(
  "/save/user",
  multer(multerConfig).single("file"),
  async (req, res) => {
    const { originalname, size, key, location: url = "" } = req.file;

    const keyTrim = key.split(" ").join("");
    const name = originalname.split(" ").join("");

    const code = require("../utils/makeCode")(7);

    const user = await User.create({
      name,
      code,
      size,
      key: keyTrim,
      url,
    });

    const message = {
      code,
      url: user.url,
    };

    await req.producer.send({
      topic: "issue-upload",
      compression: CompressionTypes.GZIP,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });

    await req.producer.disconnect();

    res.json(user);
  }
);
routes.post(
  "/save/event",
  multer(multerConfig).single("file"),
  async (req, res) => {
    const { originalname, size, key, location: url = "" } = req.file;

    const keyTrim = key.split(" ").join("");
    const name = originalname.split(" ").join("");

    const code = require("../utils/makeCode")(7);

    const event = await Event.create({
      name,
      code,
      size,
      key: keyTrim,
      url,
    });

    res.json(event);
  }
);

module.exports = routes;
