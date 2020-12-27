/* Requires */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signup, signin, userList, userFetch } = require("./controllers");
/* Requires */

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
//get
router.get("/users", userList);

//get single user
router.get("/users/:userId", userFetch);

module.exports = router;
