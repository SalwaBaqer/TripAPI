const { Profile } = require("../../db/models");

// Profile Edit Controller
exports.profileEdit = async (req, res, next) => {
  // remove console logs before merging to main
  // and remove commented code you won't use.
  console.log(req.params.profileId);
  try {
    // const salwa = await Profile.findAll();
    // console.log(
    //   "🚀 ~ file: controllers.js ~ line 8 ~ exports.profileEdit= ~ salwa",
    //   salwa
    // );
    // MY FINDBYPK IS NOT WORKING I DONNOT KNOW WHY!!!
    // don't use findByPk. Get the Profile that belongs to the logged in user.
    const foundProfile = await Profile.findByPk(req.params.profileId);
    // If profile exists
    if (foundProfile) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await foundProfile.update(req.body);
      res.status(201).json(foundProfile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    next(error);
  }
};
