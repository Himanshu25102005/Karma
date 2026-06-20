const UserBadge = require("../models/userbadge");
const express = require("express");
const Badge = require("../models/badges");
const userSchema = require("../models/users");
const Session = require("../models/focSessions");
var router = express.Router();
const Project = require("../models/projects");
const passport = require("passport");

/* Middleware to check if the user is logged in  */
const isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({
    success: false,
    error: "Authentication required",
  });
};

/* Get all available badges */

router.get("/badges", isloggedIn, async (req, res) => {
  try {
    const badges = await Badge.find().select(
      "name icon description criteria rarity",
    );

    res.status(200).json({
      success: true,
      data: badges,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Get all User's badges */

router.get("/badges/my", isloggedIn, async (req, res) => {
  try {
    const userBadges = await UserBadge.find({
      userId: req.user._id,
    })
      .populate("badgeId", "name description icon rarity color")
      .select(" badgeId earnedAt ");

    const earnedBadges = userBadges.map((b) => ({
      badge: b.badgeId,
      earnedAt: b.earnedAt,
    }));

    res.status(200).json({
      success: true,
      badges: earnedBadges,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
