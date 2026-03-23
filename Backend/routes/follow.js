const UserBadge = require("../models/userbadge");
const Badge = require("../models/Badge");
const userSchema = require("../models/users");
const Session = require("../models/focSessions");
var router = express.Router();
const Project = require("../models/projects");
const passport = require("passport");
const followSchema = require("../models/follows");
const { findByIdAndUpdate, findByIdAndDelete } = require("../models/badges");

/* Middleware to check if the user is logged in  */
const isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({
    success: false,
    error: "Authentication required",
  });
};

const isAlreadyFollowing = async (userid, followingId) => {
  const check = await followSchema.findOne({
    followerId: userid,
    followingId: followingId,
  });

  if (check) {
    return true;
  } else return false;
};

/*  Follow a user */

router.post("/social/follow/:userId", isloggedIn, async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    const isAlreadyFollowing = await checkFollowing(
      currentUserId,
      targetUserId,
    );

    if (!isAlreadyFollowing) {
      await followSchema.create({
        followerId: currentUserId,
        followingId: targetUserId,
      });

      await userSchema.findByIdAndUpdate(currentUserId, {
        $inc: { followingCount: 1 },
      });

      await userSchema.findByIdAndUpdate(targetUserId, {
        $inc: { followerCount: 1 },
      });

      res.status(201).json({ success: true, message: "Followed successfully" });
    } else {
      res.status(400).json({ error: "Already following this user" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Unfollow a User */

router.delete("/social/unfollow/:userId", isloggedIn, async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ error: "You cannot unfollow yourself" });
    }

    const isAlreadyFollowing = await checkFollowing(
      currentUserId,
      targetUserId,
    );

    if (isAlreadyFollowing == true) {
      const user = await followSchema.findOneAndDelete({
        followerId: currentUserId,
      });
      await userSchema.findOneAndUpdate(currentUserId, {
        $inc: { followingCount: -1 },
      });

      await userSchema.findOneAndUpdate(targetUserId, {
        $inc: { followerCount: -1 },
      });
    } else {
      return res.status(400).json({ error: "You don't follow this user" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Get current user's followers list */

router.get("/social/followers/:userId", isloggedIn, async (req, res) => {
  try {
    const targetUser = req.params.userId;

    const followers = await followSchema
      .find({
        followingId: targetUser,
      })
      .populate("followerId", "username avatar");

    res.status(200).json({
      success: true,
      data: followers,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});
