const express = require("express");
const { tripsList } = require("./controllers");

const router = express.Router();

router.get("/trips", tripsList);

module.exports = router;
