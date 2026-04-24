import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    color:String,
    type: String,
    description: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project_task",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    totalMinutes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("project", projectSchema);
