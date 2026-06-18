const userSchema = require("../models/users");
const Project = require("../models/projects");
const express = require("express");
const Session = require("../models/focSessions");
var router = express.Router();
const passport = require("passport");
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

const getDays = (startTime) => {
  const dateObj = new Date(startTime);

  const dayOfWeek = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  }).format(dateObj);

  return dayOfWeek;
};

const getMonths = (startTime) => {
  const dateObj = new Date(startTime);
  const month = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
  }).format(dateObj);

  return month;
};

const getDuration = (duration) => {
  if (duration == 0) return duration;
  duration = Math.round(duration / 60);
  return duration;
};

/* start session API */

router.post("/session/start", isloggedIn, async (req, res) => {
  try {
    const { projectId, type } = req.body;

    const activeSession = await Session.findOne({
      userId: req.user._id,
      status: "running",
    });

    if (activeSession) {
      return res.status(400).json({
        error:
          "You already have an active session. Stop it before starting a new one.",
      });
    }

    const newSession = await Session.create({
      projectId,
      type,
      userId: req.user._id,
      type: type,
      status: "running",
      startTime: new Date(),
    });

    res.status(201).json(newSession);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

/* End Session API */

router.patch("/session/stop/:id", isloggedIn, async (req, res) => {
  try {
    const updateSesh = await Session.findOne({
      status: "running",
      userId: req.params.id,
    });

    const userId = req.params.id;

    const user = await userSchema.findOne({
      _id: userId,
    });
    const projectId = updateSesh.projectId;

    if (!updateSesh) {
      return res.status(404).json({ error: "Focus Session not found" });
    }

    updateSesh.endTime = Date.now();
    updateSesh.status = "completed";
    updateSesh.duration = Math.floor(
      (updateSesh.endTime - updateSesh.startTime) / 1000,
    );

    const project = await Project.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        $inc: {
          totalMinutes: updateSesh.duration / 60,
          totalSessions: 1,
        },
      },
    );

    await userSchema.findByIdAndUpdate(userId, {
      $inc: {
        totalSessions: 1,
      },
    });
    await updateSesh.save();

    const newAwards = checkAndAwardBadges(req.user._id, user);
    res.status(200).json({
      success: true,
      data: {
        updatedSession: updateSesh,
        newRewards: newAwards,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/* Get info about user's current active session */

router.get("/session/active", isloggedIn, async (req, res) => {
  try {
    const currSesh = await Session.findOne({
      status: "running",
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: currSesh,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Delete a session */

router.delete("/session/delete/:id", isloggedIn, async (req, res) => {
  try {
    const delSession = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!delSession) {
      return res.status(404).json({ error: "Focus session not found" });
    }

    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Get user's focus session's history */

router.get("/session/history", isloggedIn, async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {
      userId: req.user._id,
      status: "completed",
    };

    const [sessions, totalSessions] = await Promise.all([
      Session.find(filter)
        .sort({ startTime: -1 })
        .skip(skip)
        .limit(limit)
        .populate("projectId", "name description color createdAt type")
        .select("duration startTime endTime type projectId"),

      Session.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalSessions / limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalSessions,
      sessions,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

/* API to Provide JSON data for Histogram (Weekly) */
router.get("/session/histogram/data/weekly", isloggedIn, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // ⚡ 2. UPDATE THE DATABASE FILTER
    const sessions = await Session.find({
      userId: req.user._id,
      status: "completed",
      startTime: { $gte: sevenDaysAgo },
    })
      .select("startTime duration -_id")
      .lean();

    const data = [
      { day: "Monday", duration: 0 },
      { day: "Tuesday", duration: 0 },
      { day: "Wednesday", duration: 0 },
      { day: "Thursday", duration: 0 },
      { day: "Friday", duration: 0 },
      { day: "Saturday", duration: 0 },
      { day: "Sunday", duration: 0 },
    ];

    for (let i = 0; i < sessions.length; i++) {
      sessions[i].startTime = getDays(sessions[i].startTime);
      sessions[i].duration = getDuration(sessions[i].duration);
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < sessions.length; j++) {
        if (sessions[j].startTime == data[i].day) {
          data[i].duration = data[i].duration + sessions[j].duration;
        }
      }
    }

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});

/* API to Provide JSON data for Histogram (Monthly) */
router.get("/session/histogram/data/monthly", isloggedIn, async (req, res) => {
  try {
    const data = [
      {
        month: "Jan",
        duration: 0,
      },
      {
        month: "Feb",
        duration: 0,
      },
      {
        month: "Mar",
        duration: 0,
      },
      {
        month: "Apr",
        duration: 0,
      },
      {
        month: "May",
        duration: 0,
      },
      {
        month: "Jun",
        duration: 0,
      },
      {
        month: "Jul",
        duration: 0,
      },
      {
        month: "Aug",
        duration: 0,
      },
      {
        month: "Sep",
        duration: 0,
      },
      {
        month: "Oct",
        duration: 0,
      },
      {
        month: "Nov",
        duration: 0,
      },
      {
        month: "Dec",
        duration: 0,
      },
    ];

    const sessions = await Session.find({
      userId: req.user._id,
      status: "completed",
    })
      .select("startTime duration -_id")
      .lean();

    for (let i = 0; i < sessions.length; i++) {
      sessions[i].startTime = getMonths(sessions[i].startTime);
      sessions[i].duration = getDuration(sessions[i].duration);
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < sessions.length; j++) {
        if (sessions[j].startTime == data[i].month) {
          data[i].duration = data[i].duration + sessions[j].duration;
        } else continue;
      }
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get("/session/heatmapData", isloggedIn, async (req, res) => {
  try {
    const data = await Session.aggregate([
      {
        $match: {
          userId: req.user._id,
          status: "completed",
          duration: { $gte: 0 },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});

module.exports = router;
