const Mongoose = require("mongoose");
const UserSchema = new Mongoose.Schema({
  name: String,
  code: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function () {
  if (!this.url)
    this.url = `${process.env.APP_URL}${process.env.UPLOAD_PORT}/files/${this.key}`;
});

module.exports = Mongoose.model("User", UserSchema);
