const userSchema = require("../models/users");
const Session = require("../models/focSessions");
var router = express.Router();
const Project = require("../models/projects");
const passport = require("passport");
const projects = require("../models/projects");

// At the top of your file, add mongoose import
const mongoose = require('mongoose');

// Helper function - no req/res, just pure logic
async function calculateStreak(userId) {
  try {
    const streakData = await Session.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId), // Use parameter, not req.user._id
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
      return {  // Return object, not res.json()
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      };
    }

    const dateObjects = dates.map((d) => new Date(d));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = 0;

    // Calculate current streak
    const firstDate = new Date(dateObjects[0]);
    if (firstDate.getTime() !== today.getTime()) {
      currentStreak = 0;
    } else {
      currentStreak = 1;

      for (let i = 0; i < dateObjects.length - 1; i++) {
        const diff =
          (dateObjects[i] - dateObjects[i + 1]) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 0; i < dateObjects.length - 1; i++) {
      const diff =
        (dateObjects[i] - dateObjects[i + 1]) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    // Return the data
    return {
      currentStreak,
      longestStreak,
      lastActiveDate: dates[0], // Most recent date
    };

  } catch (error) {
    throw new Error(`Streak calculation failed: ${error.message}`);
  }
}