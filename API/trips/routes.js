const express = require("express");
const { tripsList, addtrip, updatetrip } = require("./controllers");

const router = express.Router();

router.get("/", tripsList);

//Only user can add and update gotta get back once sign in works
router.post("/", addtrip);

router.put("/:tripId", updatetrip);

module.exports = router;
