const Mongoose = require("mongoose");
const EventSchema = new Mongoose.Schema({
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

EventSchema.pre("save", function () {
  if (!this.url)
    this.url = `${process.env.APP_URL}${process.env.UPLOAD_PORT}/files/${this.key}`;
});

module.exports = Mongoose.model("Event", EventSchema);
