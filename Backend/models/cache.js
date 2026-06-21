const mongoose = require("mongoose");

const cache_schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  model: {
    type: String,
  },
  insights: {
    bestFocusWindow: {
      timeRange: String,
      confidence: Number,
      insight: String,
    },
    mostProductiveProject: {
      project: String,
      metric: String,
      insight: String,
    },
    focusLeak: {
      title: String,
      insight: String,
    },
    recommendation: {
      title: String,
      insight: String,
    },
  },
  totalSessions: Number
});

module.exports = mongoose.model("cache", cache_schema);
