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

/* Create Project */

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

router.patch("/project/complete/:id", isloggedIn, async (req, res) => {
  try {
    const updateProject = await Project.findOne({
      userId: req.user._id,
      isActive: true,
      _id: req.params.id,
    });

    if (!updateProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    updateProject.updatedAt = Date.now();
    updateProject.isActive = false;

    await updateProject.save();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


/* Update Project Details */

router.patch("/project/update/:id", isloggedIn, async (req, res) => {
  try {
    const { name, description, color } = req.body; // Get fields to update

    const updateProject = await Project.findOne({
      userId: req.user._id,
      isActive: true,
      _id: req.params.id,
    });

    if (!updateProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update fields if provided
    if (name) updateProject.name = name.trim().toLowerCase();
    if (description !== undefined) updateProject.description = description;
    if (color) updateProject.color = color;

    await updateProject.save();

    res.status(200).json({ 
      success: true, 
      data: updateProject 
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* View all Projects */

router.get("/project", isloggedIn, async (req, res) => {
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

router.get("/project/:id", isloggedIn, async (req, res) => {
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

/* Get Total Sessions and Total Minutes */
router.get("/project/totalSession", isloggedIn, async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $match: {
          userId: req.user._id,
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "sessions",
          let: { projectId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$projectId", "$$projectId"] },
                    { $eq: ["$status", "completed"] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: null,
                totalSessions: { $sum: 1 },
                totalMinutes: { $sum: "$duration" },
              },
            },
          ],
          as: "stats",
        },
      },
      {
        $project: {
          name: 1,
          totalSessions: {
            $ifNull: [{ $arrayElemAt: ["$stats.totalSessions", 0] }, 0],
          },
          totalMinutes: {
            $ifNull: [{ $arrayElemAt: ["$stats.totalMinutes", 0] }, 0],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Delete Project */
router.delete("/project/:id/delete", isloggedIn, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const session = await Session.findOne({
      projectId: req.params.id,
      status: "running",
    });

    if (session) {
      res
        .status(400)
        .json({ error: "Cannot delete a project having an active session" });
    }

    const project = await Project.findOneAndUpdate({
      userId: req.user._id,
      _id: req.params.id,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.isActive = false;

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});