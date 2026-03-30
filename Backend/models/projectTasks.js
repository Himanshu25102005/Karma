import mongoose from "mongoose";

const project_task_schema = mongoose.createConnection({
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("project_task", project_task_schema);
