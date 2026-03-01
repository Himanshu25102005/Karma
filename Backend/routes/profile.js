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

/* Get own profile */
router.get("/profile/me", isloggedIn, async (req, res) => {
  try {
    const profile = await User.findById(req.user._id);

    if (!profile) {
      return res.status(404).json({ error: "profile doesn't exist" });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* Update Profile */

router.patch("/profile/me/update", isloggedIn, async (req, res) => {
  try {
    const allowedFields = ["username", "email", "github", "bio", "website", "isPublic"];
    const updates = {};

    for (let key of allowedFields) {
      if (req.body[key]) {
        updates[key] = req.body[key].trim();
      }
    }

    if(isPublic==true || isPublic==false) profile.isPublic = isPublic;

    if (updates.username) {
      updates.username = updates.username.toLowerCase();
    }

    if (updates.email) {
      updates.email = updates.email.toLowerCase();

      const existingEmail = await User.findOne({
        email: updates.email,
        _id: { $ne: req.user._id }
      });

      if (existingEmail) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    if (updates.username) {
      const existingUsername = await User.findOne({
        username: updates.username,
        _id: { $ne: req.user._id }
      });

      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select("username email github bio website createdAt");

    res.status(200).json({
      success: true,
      profile: updatedUser,
      message: "Profile updated successfully"
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* View Public Profile */

router.get('/profile/:username', isloggedIn, async (req, res)=>{
    try{
        
        const profile = await userSchema.aggregate([
            {
                $match:
                {
                    userId: req.user._id,
                    isPublic: true,
                }
            },
            {
                $lookup:
                {
                    from: "Session"
                }
            }
        ])



    }catch(e){
        res.status(500).json({error: e.message});
    }
})
