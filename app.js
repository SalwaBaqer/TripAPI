const express = require("express");

const db = require("./db/models");
const cors = require("cors");

//routes
const tripsRoutes = require("./API/trips/routes");
const userRoutes = require("./API/users/routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(tripsRoutes);
app.use(userRoutes);


const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
