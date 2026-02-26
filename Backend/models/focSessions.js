const mongoose = require("mongoose");

const focSessionSchema = mongoose.Schema({
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: Date,
  duration: Number,
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["running", "completed", "paused", "cancelled"], // Youu can add new options here
    default: "running",
  },
  tag: {
    type: [String], 
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true
  },
});

module.exports = mongoose.model("session", focSessionSchema);
