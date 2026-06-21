const Session = require("../models/focSessions");
const mongoose = require('mongoose');

// REMOVE THESE LINES:
// var router = express.Router(); 
// const userSchema = require("../models/users");
// const passport = require("passport");

async function streak(userId) {
  try {
    const streakData = await Session.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          status: "completed",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$startTime",
            },
          },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    const dates = streakData.map((item) => item._id);

    if (dates.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      };
    }

    const dateObjects = dates.map((d) => new Date(d));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = 0;
    const firstDate = new Date(dateObjects[0]);
    
    // Streak logic...
    if (firstDate.getTime() !== today.getTime()) {
      currentStreak = 0;
    } else {
      currentStreak = 1;
      for (let i = 0; i < dateObjects.length - 1; i++) {
        const diff = (dateObjects[i] - dateObjects[i + 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) currentStreak++;
        else break;
      }
    }

    // Longest streak logic...
    let longestStreak = 0;
    let tempStreak = 1;
    for (let i = 0; i < dateObjects.length - 1; i++) {
      const diff = (dateObjects[i] - dateObjects[i + 1]) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);

    return {
      currentStreak,
      longestStreak,
      lastActiveDate: dates[0],
    };

  } catch (error) {
    throw new Error(`Streak calculation failed: ${error.message}`);
  }
}

module.exports = streak;