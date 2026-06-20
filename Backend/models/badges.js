const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: String,
    description: String,

    criteria: {
      criteriaType: {
        type: String,
        required: true,
        enum: ["sessions", "minutes", "projects", "streak"],
      },
      count: {
        type: Number,
        required: true,
      },
    },

    rarity: {
      type: String,
      enum: ["Common", "Rare", "Epic", "Legendary", "Mythic"],
      default: "common",
    },
    color:{
      type:String,
      default:"#1f1f1f"
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Badge", badgeSchema);
