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
    // REVIEW: Read your code again.. what's weird about it?
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);

    newTrip.userId = req.user.id;
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update trip
exports.updatetrip = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    if (req.user.id === req.body.userId) {
      // REVIEW: Why not use a route param to deal with finding a trip?
      const foundTrip = await Trip.findByPk(tripId);
      if (foundTrip) {
        await foundTrip.update(req.body);
        res.status(201).json(foundTrip);
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } else {
      // REVIEW: Status code and message inconsistent
      res.status(500).json({ message: "Aunthozrized" });
    }
  } catch (error) {
    next(error);
  }
};
