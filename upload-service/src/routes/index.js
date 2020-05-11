const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

const User = require("../documents/User");

routes.get("/teste", (req, res) => res.send("teste"));

routes.post("/save", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname, size, key, location: url = "" } = req.file;

  const keyTrim = key.split(" ").join("");
  const name = originalname.split(" ").join("");

  const user = await User.create({
    name,
    userId: "null",
    size,
    key: keyTrim,
    url,
  });
  res.json(user);
});

module.exports = routes;
