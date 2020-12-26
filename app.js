/* Requires */
const express = require("express");

//path
const path = require("path");

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
app.use("/media", express.static(path.join(__dirname, "media")));

// NOT FOUND PATH MIDDLEWARE
// app.use((req, res, next) => {
//   res.status(404).json({ messagae: "Path Not Found!" });
// });
// ERROR HANDLING MIDDLEWARE
// app.use((err, req, res, next) => {
//   res.status(err.status ?? 500);
//   res.json({ message: err.message || "Internal Server Error" });
// });


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
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");

    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
