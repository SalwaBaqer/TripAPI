const express = require("express");
//controllers
const { tripsList, addtrip, updatetrip } = require("./controllers");

//passport
const passport = require("passport");

const router = express.Router();

router.get("/", tripsList);

//Only user can add and update gotta get back once sign in works
router.post("/", passport.authenticate("jwt", { session: false }), addtrip);

router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  updatetrip
);

module.exports = router;
