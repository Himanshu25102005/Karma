const userSchema = require("../models/users");
const Project = require("../models/projects");
const express = require("express");
const Session = require("../models/focSessions");
var router = express.Router();
const passport = require("passport");
const UserBadge = require("../models/userbadge");
const Badge = require("../models/badges");
const { checkAndAwardBadges } = require("../utils/checkAndAwardBadges");

/* Middleware to check if the user is logged in  */
const isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({
    success: false,
    error: "Authentication required",
  });
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

    const newAwards = checkAndAwardBadges(req.user._id, user.totalSessions);
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

module.exports = router;
