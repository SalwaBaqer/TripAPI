const express = require("express");
const router = express.Router();
// Controllers
const { profileEdit } = require("./controllers");
// Upload Images
const upload = require("../../middleware/multer");
//passport
const passport = require("passport");

// Profile Edit
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileEdit
);

module.exports = router;
