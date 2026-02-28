const userSchema = require("../models/users");
const Session = require("../models/focSessions");
var router = express.Router();
const passport = require("passport");

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

    res.json({
      success: true,
      totalFocusTime: totalFocusTime,
    });
  } catch (e) {
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
          totalTime: { $sum: "$duration" },
          totalSessions: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(daily);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* GET /stats/streak */

router.get("/stats/streak", isloggedIn, async (req, res) => {
  try {
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

    
    const dateObjects = dates.map((d) => new Date(d));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = 0;

    
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

    res.status(200).json({
      currentStreak,
      longestStreak,
      lastActiveDate: dates[0],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
