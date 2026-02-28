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
        },
      },
    ]);

    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
