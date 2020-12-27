const express = require("express");

//db
const db = require("./db/models");
const cors = require("cors");

//passport
const passport = require("passport");

// Passport Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//routes
const tripsRoutes = require("./API/trips/routes");
const userRoutes = require("./API/users/routes");
const profileRoutes = require("./API/profiles/routes");

//path
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// I FOUND THIS WHILE MERGING AND DID NOT WANT TO RISK IT AND DELETE 
const mediaPath = path.join(__dirname, "media");


// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/trips", tripsRoutes);
app.use("/media", express.static(mediaPath));
app.use(userRoutes);
app.use("/profiles", profileRoutes);

//path not found
app.use((req, res) => {
  res.status(404).json({ message: "PATH NOT FOUND" });
});

//handling errors
app.use((err, req, res, next) => {
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "Internal Server Error" });
});

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
