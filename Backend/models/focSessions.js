const mongoose = require("mongoose");

const focSessionSchema = mongoose.Schema({
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: Date,
  duration: Number,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  status: {
    type: String,
    enum: ["running", "completed", "paused", "cancelled"],
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
    index: true,
  },
});

module.exports = mongoose.model("session", focSessionSchema);
