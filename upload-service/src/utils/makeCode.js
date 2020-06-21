let crypto = require("crypto");
const characters = require("./constants/abc");
const makeid = (length) => {
  let id = crypto.randomBytes(20).toString("hex");
  let firstPart = "";
  let code = "";

  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    firstPart += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  let result = firstPart.toUpperCase();
  return (code = result + id.toUpperCase());
};

module.exports = makeid;


