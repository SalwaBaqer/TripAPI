const { Profile } = require("../../db/models");

// Profile Edit Controller
exports.profileEdit = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findByPk(req.user.profileId);
    // If profile exists
    if (foundProfile) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await foundProfile.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    next(error);
  }
};
