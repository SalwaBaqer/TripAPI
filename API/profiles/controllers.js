const { Profile } = require("../../db/models");

// Profile Edit Controller
exports.profileEdit = async (req, res, next) => {
  try {
    await req.profile.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// add image picker (multer)
