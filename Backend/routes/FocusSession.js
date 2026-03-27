const userSchema = require("../models/users");
const Session = require("../models/focSessions");
var router = express.Router();
const Project = require("../models/projects");
const passport = require("passport");
const UserBadge = require("../models/userbadge");
const Badge = require("../models/Badge");
const checkAndAwardBadges = ("../utils/checkAndAwardBadges");

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
    // 1. Consistently use projectId
    const { projectId, tag } = req.body;

    // 2. The "Safety Guard": Prevent multiple active sessions
    const activeSession = await Session.findOne({
      userId: req.user._id,
      status: "running", // This relies on your schema having a status field
    });

    if (activeSession) {
      return res.status(400).json({
        error: "You already have an active session. Stop it before starting a new one.",
      });
    }

    // 3. Create the session
    const newSession = await Session.create({
      projectId, // Links to the Project model
      tag,
      userId: req.user._id,
      status: "running", // Explicitly set if not in schema default
      startTime: new Date(), // Good practice to set this on start
    });

    res.status(201).json(newSession);
  } catch (e) {
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

    if (!updateSesh) {
      return res.status(404).json({ error: "Focus Session not found" });
    }

    updateSesh.endTime = Date.now();
    updateSesh.status = "completed";
    updateSesh.duration = Math.floor(
      (updateSesh.endTime - updateSesh.startTime) / (1000 * 60),
    );

    await userSchema.findByIdAndUpdate(userId, {
      $inc: {
        totalSessions: 1,
      },
    });
    await updateSesh.save();

    const newAwards = checkAndAwardBadges(req.user._id, totalSessions);
    res.status(200).json({
      success: true,
      data: {
        updatedSession: updateSesh,
        newRewards: newAwards,
      },
    });
  } catch (err) {
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
        .populate("projectId", "name description")
        .select("duration startTime endTime tag projectId"),

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
    res.status(500).json({ error: e.message });
  }
});
