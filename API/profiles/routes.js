const express = require("express");
const router = express.Router();
// Controllers
const { profileEdit } = require("./controllers");
// Upload Images
const upload = require("../../middleware/multer");

// Profile Edit
// add permissions so that only logged in users can edit their profile.
// remove URL parameter, you don't need it.
router.put("/:profileId", upload.single("image"), profileEdit);

module.exports = router;
