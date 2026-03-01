const userSchema = require("../models/users");
const Session = require("../models/focSessions");
var router = express.Router();
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

router.post("/project/create", isloggedIn, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        error: "Project name is required",
      });
    }

    const existingProject = await Project.findOne({
      userId: req.user._id,
      name: req.body.name,
    });

    if (existingProject) {
      return res.status(400).json({ error: "Project already created" });
    }

    const newProject = await Project.create({
      name: name.trim().toLowerCase(),
      description: description,
      userId: req.user._id,
    });

    res.status(201).json({ newProject });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/project/projects", isloggedIn, (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {
      userId: req.user._id,
      isActive: true,
    };
    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
