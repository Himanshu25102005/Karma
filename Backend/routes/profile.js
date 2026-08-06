const express = require("express");
var router = express.Router();
const userSchema = require("../models/users");
const Session = require("../models/focSessions");
const streak = require("../utils/streak");
const Project = require("../models/projects");
const passport = require("passport");
const projects = require("../models/projects");

/* Middleware to check if the user is logged in  */
const isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({
    success: false,
    error: "Authentication required",
  });
};

/* Get own profile */
router.get("/profile/me", isloggedIn, async (req, res) => {
  try {
    const profile = await userSchema.findById(req.user._id);

    if (!profile) {
      return res.status(404).json({ error: "profile doesn't exist" });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (e) {
    console.error("FULL ERROR STACK:", e);
    res.status(500).json({ error: e.message });
  }
});

/* Update Profile */

router.patch("/profile/me/update", isloggedIn, async (req, res) => {
  try {
    const allowedFields = [
      "username",
      "email",
      "github",
      "bio",
      "website",
      "isPublic",
      "about",
    ];
    const updates = {};

    for (let key of allowedFields) {
      if (typeof req.body[key] === "string") {
        updates[key] = req.body[key].trim();
      } else {
        updates[key] = req.body[key];
      }
    }

    const user = req.user;

    if (typeof req.body.isPublic === "boolean") {
      updates.isPublic = req.body.isPublic;
    }

    if (updates.username) {
      updates.username = updates.username.toLowerCase();
    }

    if (updates.email) {
      updates.email = updates.email.toLowerCase();

      const existingEmail = await userSchema.findOne({
        email: updates.email,
        _id: { $ne: req.user._id },
      });

      if (existingEmail) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    if (updates.username) {
      const existingUsername = await userSchema.findOne({
        username: updates.username,
        _id: { $ne: req.user._id },
      });

      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    const updatedUser = await userSchema.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("username email github bio website createdAt isPublic about");

    res.status(200).json({
      success: true,
      profile: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

/* View Public Profile */

router.get("/profile/:username", isloggedIn, async (req, res) => {
  try {
    // 1. Fetch the User first to get their ID and Profile details
    const user = await userSchema
      .findOne({
        username: req.params.username,
        isPublic: true,
      })
      .select("username bio github website");

    if (!user) {
      return res.status(404).json({ error: "Profile not found or is private" });
    }

    // 2. Setup Pagination
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    // 3. Use Promise.all to fetch Session History and Total Count simultaneously
    const [sessions, totalSessionsCount] = await Promise.all([
      Session.find({ userId: user._id })
        .sort({ startTime: -1 })
        .skip(skip)
        .limit(limit)
        .populate("projectId", "name description")
        .select("duration startTime endTime tag"),

      Session.countDocuments({ userId: user._id, status: "completed" }),
    ]);

    const totalPages = Math.ceil(totalSessionsCount / limit);
    const currStreak = await streak(req.user._id);

    // 4. Return everything in one response
    res.status(200).json({
      success: true,
      data: {
        // User Profile Info
        username: user.username,
        bio: user.bio,
        github: user.github,
        website: user.website,
        // Stats
        totalSessions: totalSessionsCount,
        // Pagination & History
        pagination: {
          currentPage: page,
          totalPages,
          limit,
        },
        streak: currStreak,
        history: sessions,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

/* Get Online Members */
router.get("/profile/isOnline", isloggedIn, async (req, res) => {});

module.exports = router;
