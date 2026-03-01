const mongoose = require("mongoose");
const plm = require("passport-local-mongoose").default;

const userSchema = mongoose.Schema({
  name: String,
  username:{
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  isPublic:{
    type: Boolean,
    default: true,
  },
  googleId: String,
  password: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  totalFocusTime: Number,
  profilePicture: String,
  badges: [],
  github: String,
  bio: String,
  website: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        // This regex checks for http/https and basic domain structure
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
