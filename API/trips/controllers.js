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

//delete
exports.tripDelete = async (req, res) => {
  const { tripId } = req.params;
  try {
    const foundTrip = await Trip.findByPk(tripId);
    if (foundTrip) {
      await foundTrip.destroy();
      res.status(204).end();
    } else res.status(404).json({ message: "Trip not found" });
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
    req.body.UserId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update trip
exports.updatetrip = async (req, res, next) => {
  try {
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
