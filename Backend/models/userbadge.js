const userBadgeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true,
    index: true 
  },
  badgeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Badge', 
    required: true 
  }, 
  earnedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("UserBadge", userBadgeSchema);