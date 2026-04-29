const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: String,
  description: String,
  
  criteria: {
    criteriaType: { 
      type: String, 
      required: true,
      enum: ["sessions", "minutes", "projects", "streak"] 
    },
    count: { 
      type: Number, 
      required: true 
    }
  },

  rarity: {
    type: String,
    enum: ["common", "rare", "epic", "legendary"],
    default: "common",
  }
}, { timestamps: true }); 

module.exports = mongoose.model("Badge", badgeSchema);