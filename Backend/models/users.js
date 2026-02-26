const mongoose = require("mongoose");
const plm = require("passport-local-mongoose").default;

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  googleId: String,
  password: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  totalFocusTime: Number,
  profilePicture: String,
  badges: [],
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
