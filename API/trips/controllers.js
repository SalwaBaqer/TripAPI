const { Trip } = require("../../db/models");
const { User } = require("../../db/models");

//trip list
exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete
exports.tripDelete = async (req, res) => {
  const { tripId } = req.params;
  try {
    const foundTrip = await Trip.findByPk(tripId);
    if (req.user.id === foundTrip.userId) {
      if (foundTrip) {
        await foundTrip.destroy();
        res.status(204).end();
      } else res.status(404).json({ message: "Trip not found" });
    } else res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//add trip
exports.addtrip = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    newTrip.dataValues.user = { username: req.user.username };
    console.log(newTrip);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update trip
exports.updatetrip = async (req, res, next) => {
  try {
    console.log(
      "req.user.id ",
      req.user.id,
      "req.body.userId",
      req.body.userId
    );

    if (req.user.id === +req.body.userId) {
      const foundTrip = await Trip.findByPk(req.params.tripId);
      //trip exist
      if (foundTrip) {
        if (req.file) {
          req.body.image = `http://${req.get("host")}/media/${
            req.file.filename
          }`;
        }
        await foundTrip.update(req.body);
        res.status(201).json(foundTrip);
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};
