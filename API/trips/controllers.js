const { Trip } = require("../../db/models");

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
