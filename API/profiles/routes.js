const express = require("express");
const router = express.Router();
// Controllers
const { profileFetch, profileEdit } = require("./controllers");
// Upload Images
const upload = require("../../middleware/multer");
//passport
const passport = require("passport");

// Profile Fetch
router.get("/:userId", profileFetch);

// Profile Edit
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileEdit
);

module.exports = router;
