const { Trip } = require("../../db/models");

//trip list
exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add trip
exports.addtrip = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update trip
exports.updatetrip = async (req, res, next) => {
  try {
    if (req.user.id === req.body.userId) {
      const foundTrip = await Trip.findByPk(req.params.tripId);
      if (foundTrip) {
        await foundTrip.update(req.body);
        res.status(201).json(foundTrip);
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } else {
      res.status(500).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};
