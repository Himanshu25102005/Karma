const userSchema = require("../models/users");
const express = require("express");
const mongoose = require("mongoose");
const Session = require("../models/focSessions");
var router = express.Router();
const project_task = require("../models/projectTasks");
const UserBadge = require("../models/userbadge");
const Badge = require("../models/badges");
const checkAndAwardBadges = require("../utils/checkAndAwardBadges");

/* Middleware to check if the user is logged in  */
const isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({
    success: false,
    error: "Authentication required",
  });
};

/* GET /stats/overview endpoint */

router.get("/stats/overview", isloggedIn, async (req, res) => {
  try {
    const summary = await Session.aggregate([
      // Stage 1: Filter to only this user's completed sessions
      {
        $match: {
          userId: req.user._id,
          status: "completed",
        },
      },
      // Stage 2: Sum up the durations
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$duration" },
          totalSessions: { $sum: 1 },
          averageSessionDuration: { $avg: "$duration" },
          longestSession: { $max: "$duration" },
          shortestSession: { $min: "$duration" },
        },
      },
    ]);

    // MongoDB aggregate always returns an array.
    // If there's no data, summary will be [], otherwise [{_id: null, totalSum: X}]
    const totalFocusTime = summary.length > 0 ? summary[0].totalSum : 0;

    const totalCompletedTasks = await project_task.countDocuments({
      userId: req.user._id,
      isCompleted: true,
    });

    const totalTasks = await project_task.countDocuments({
      userId: req.user._id,
    });

    res.json({
      success: true,
      totalFocusTime: totalFocusTime,
      summary: summary,
      totalTasks: totalTasks,
      totalCompletedTasks: totalCompletedTasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

/* GET /stats/by-project endpoint */

router.get("/stats/by-project", isloggedIn, async (req, res) => {
  try {
    const project = await Session.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
          status: "completed",
        },
      },
      {
        $group: {
          _id: "$projectName",
          totalTime: { $sum: "$duration" },
          totalSessions: { $sum: 1 },
          averageSessionDuration: { $avg: "$duration" },
        },
      },
      {
        $sort: { totalTime: -1 },
      },
      {
        $project: {
          _id: 0,
          projectName: "$_id",
          totalTime: 1,
          totalSessions: 1,
          averageSessionDuration: 1,
        },
      },
    ]);

    res.status(200).json(project);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

/* GET /stats/daily */

router.get("/stats/daily", isloggedIn, async (req, res) => {
  try {
    const daily = await Session.aggregate([
      {
        $match: {
          userId: req.user._id,
          status: "completed",
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$startTime",
              timezone: "Asia/Kolkata",
            },
          },

          totalTime: {
            $sum: "$duration",
          },

          totalSessions: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      daily,
    });
  } catch (e) {
    console.error("Aggregation Error:", e);

    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

/* GET /stats/streak */

router.get("/stats/streak", isloggedIn, async (req, res) => {
  try {
    const user = req.user;
    const streakData = await Session.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
          status: "completed",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$startTime",
              timezone: "Asia/Kolkata",
            },
          },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    const dates = streakData.map((item) => item._id);

    if (dates.length === 0) {
      return res.status(200).json({
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      });
    }

    // Build date objects from strings in local midnight terms — no timezone shift
    const dateObjects = dates.map((d) => {
      const [year, month, day] = d.split("-").map(Number);
      return new Date(year, month - 1, day); // local midnight, no UTC conversion
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Fix bug 2: allow streak if last session was today OR yesterday
    let currentStreak = 0;
    const lastDate = dateObjects[0];

    if (
      lastDate.getTime() === today.getTime() ||
      lastDate.getTime() === yesterday.getTime()
    ) {
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

    // Longest streak logic — was correct, keeping as is
    let longestStreak = 1;
    let tempStreak = 1;

    for (let i = 0; i < dateObjects.length - 1; i++) {
      const diff =
        (dateObjects[i] - dateObjects[i + 1]) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    }

    await userSchema.updateOne(
      {
        _id: req.user._id
      },
      {
        currentStreak: currentStreak
      }
    )
    const newAwards = await checkAndAwardBadges(req.user._id, user);

    res.status(200).json({
      currentStreak,
      longestStreak,
      lastActiveDate: dates[0],
      newAwards,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
