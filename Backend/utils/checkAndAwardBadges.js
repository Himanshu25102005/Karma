const UserBadge = require("../models/userbadge");
const Badge = require("../models/Badge");

const checkAndAwardBadges = async (userId, userStats) => {
  try {
    // 1. Get IDs of badges this user ALREADY has
    const earnedBadgeObjects = await UserBadge.find({ userId }).select("badgeId");
    const earnedBadgeIds = earnedBadgeObjects.map(b => b.badgeId.toString());

    // 2. Find badges they haven't earned yet
    const potentialBadges = await Badge.find({
      _id: { $nin: earnedBadgeIds }
    });

    const newAwards = [];

    // 3. Loop and Compare
    for (const badge of potentialBadges) {
      let isEligible = false;
      const { criteriaType, count } = badge.criteria;

      switch (criteriaType) {
        case "sessions":
          if (userStats.totalSessions >= count) isEligible = true;
          break;
        case "minutes":
          if (userStats.totalMinutes >= count) isEligible = true;
          break;
        case "streak":
          if (userStats.currentStreak >= count) isEligible = true;
          break;
      }

      // 4. Allocate if eligible
      if (isEligible) {
        const newBadge = await UserBadge.create({
          userId: userId,
          badgeId: badge._id
        });
        newAwards.push(badge.name);
      }
    }

    return newAwards; // Returns names of newly unlocked badges
  } catch (error) {
    console.error("Badge Error:", error);
    return [];
  }
};