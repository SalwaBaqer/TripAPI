const express = require("express");
const router = express.Router();
// Controllers
const { profileEdit } = require("./controllers");
// Upload Images
const upload = require("../../middleware/multer");

// Profile Edit
router.put("/:profileId", upload.single("image"), profileEdit);

module.exports = router;
