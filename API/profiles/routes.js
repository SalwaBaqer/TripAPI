const express = require("express");
const router = express.Router();
const profileEdit = require("./controllers");

// Profile Edit
router.put("/profile/:profileid", profileEdit);

module.exports = router;
