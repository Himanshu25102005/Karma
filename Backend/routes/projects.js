const userSchema = require("../models/users");
const express = require("express");
const Session = require("../models/focSessions");
const mongoose = require("mongoose");
var router = express.Router();
const Project = require("../models/projects");
const project_task = require("../models/projectTasks");

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
    const { name, description, color, type } = req.body;

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
      name: name,
      color: color,
      type: type,
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
    const { name, description, type, isCurrent, color } = req.body;

    const updateProject = await Project.findOne({
      userId: req.user._id,
      isActive: true,
      _id: req.params.id,
    });

    if (!updateProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update fields if provided
    if (name) updateProject.name = name;
    if (description !== undefined) updateProject.description = description;
    if (color) updateProject.color = color;
    if (type) updateProject.type = type;
    if (isCurrent == true) {
      updateProject.isCurrent = true;

      await Project.updateMany(
        {
          _id: { $ne: req.params.id },
          userId: req.user._id,
        },
        {
          $set: { isCurrent: false },
        },
      );
    }

    await updateProject.save();

    res.status(200).json({
      success: true,
      data: updateProject,
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

    console.log("What is Project?", Project);

    const [projects, totalProjects] = await Promise.all([
      Project.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "name description color type totalSessions isCurrent totalMinutes createdAt ",
        ),

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
    console.error("BACKEND CRASH:", e);
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
    }).select("name description type totalSessions totalMinutes createdAt");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (e) {
    console.log(e);
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

/* Add a Task to a Project */
router.post("/project/AddTask/:projectId", isloggedIn, async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const description = req.body.description;

    const task = await project_task.create({
      description: description,
      projectId: projectId,
    });

    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: task._id },
    });

    res.status(200).json({
      success: true,
      task: task,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e.message,
    });
  }
});

/* Delete a Task from a Project */
router.delete(
  "/project/DeleteTask/:taskId/:projectId",
  isloggedIn,
  async (req, res) => {
    try {
      const { taskId, projectId } = req.params;

      const task = await projTask.findByIdAndDelete({
        _id: taskId,
      });

      await Project.findByIdAndUpdate(
        {
          _id: projectId,
        },
        {
          $pull: { tasks: taskId },
        },
      );

      res.status(200).json({
        success: true,
      });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  },
);

/* Mark a task as Complete*/
router.patch("/project/checkTask/:taskId", isloggedIn, async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await project_task.findOneAndUpdate(
      {
        _id: taskId,
        isCompleted: false,
      },
      {
        $set: { isCompleted: true },
      },
      {
        new: true,
      },
    );

    if (task) {
      return res.status(200).json({
        success: true,
        task: task,
      });
    } else {
      // If task is null, it means it was either already true or doesn't exist
      return res.status(400).json({
        error: "Task not found or already completed",
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message,
    });
  }
});

/* Mark a task as Incomplete */
router.patch("/project/uncheckTask/:taskId", isloggedIn, async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await projTask.findByIdAndUpdate(
      {
        _id: taskId,
        isCompleted: true,
      },
      {
        $set: { isCompleted: false },
      },
      {
        new: true,
      },
    );

    if (task) {
      return res.status(200).json({
        success: true,
        task: task,
      });
    } else {
      return res.status(400).json({
        error: "Task not found or already incomplete",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

/* Display all tasks of a project */
router.get("/project/tasks/:projectId", isloggedIn, async (req, res) => {
  try {
    const { projectId } = req.params;

    const allTasks = await Project.findOne({
      _id: projectId,
    }).populate({
      path: "tasks",
      options: { sort: { createdAt: 1 } }, // Sorts by oldest first
    });

    res.status(200).json({
      success: true,
      tasks: allTasks,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

module.exports = router;
