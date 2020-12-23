/* Requires */
const express = require("express");

const db = require("./db/models");
const cors = require("cors");
const passport = require("passport");
// Passport Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const tripsRoutes = require("./API/trips/routes");
const userRoutes = require("./API/users/routes");
/* Requires */

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/trips", tripsRoutes);
app.use(userRoutes);

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
