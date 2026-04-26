var express = require("express");
const passport = require("passport");
const User = require("../models/users");
var router = express.Router();
require("./auth");

/* Middleware to check if the user is logged in */

const isloggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else res.redirect("/signup");
};

/* Funtion to check username is already in use or not */
const checkUser = async (user) => {
  const baseSlug = user.username.replace(/\s+/g, "_").toLowerCase();

  let slug = baseSlug;

  const existingUser = await User.findOne({ username: slug });

  if (existingUser) {
    const randomNumber = Math.floor(100 + Math.random() * 900);
    slug = `${baseSlug}${randomNumber}`;
  }

  user.username = slug;

  await user.save();

  return slug;
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Normal Login and Signup Routes */
router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, profilePicture, password } = req.body;

    const newUser = new User({ name, username, email, profilePicture });

    const registeredUser = await User.register(newUser, password);

    res.send({
      message: "User registered successfully!",
      user: registeredUser,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/signup",
    successRedirect: "/session",
  }),
);

/* Oauth Login Route */
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

/* Google Callback Route */
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    req.session.save(() => {
      res.redirect("http://localhost:3000/session");
    });
  },
);
/* Log out route */

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

/* Accessing User Data(using google route) */
router.get("/getInfo", isloggedIn, (req, res, next) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
