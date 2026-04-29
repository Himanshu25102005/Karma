require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
const passport = require("passport");
var path = require("path");
const user = require("./models/users");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var projectRouter = require("./routes/projects");
var profileRouter = require("./routes/profile");

var app = express();
//db connection
connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://hoppscotch.io"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

//Session Configuration
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Keep false for localhost
      httpOnly: true,
      sameSite: "lax", // This allows the cookie to be shared more easily on localhost
    },
  }),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
passport.use(user.createStrategy());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initialize Passport
app.use(passport.initialize());

// Enable Passport Sessions
app.use(passport.session());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
// Now your routes can follow
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", projectRouter);
app.use("/", profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
