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

/* Creat Project */

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

/* Complete a Project */

router.patch("/project/update/:id", isloggedIn, async (req, res) => {
  try {
    const updateProject = await Project.findOne({
        userId: req.user._id,
        isActive: true,
        _id: req.params.id
    })

    if(!updateProject){
        return res.status(404).json({error: "Project not found"});
    };

    updateProject.updatedAt =  Date.now();
    updateProject.isActive = false;

    await updateProject.save();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* View all Projects */

router.get("/projects", isloggedIn, async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {
      userId: req.user._id,
      isActive: true,
    };

    const [projects, totalProjects] = await Promise.all([
      Project.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("name description totalSessions totalMinutes createdAt"),

      Project.countDocuments(filter),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalProjects / limit));

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalProjects,
      projects,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Get single project details */

router.get("/projects/:id", isloggedIn, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
      isActive: true,
    }).select("name description totalSessions totalMinutes createdAt");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
