const { Trip } = require('../../db/models')

//list
exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    res.json(trips)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete
exports.tripDelete = async (req, res) => {
  const { tripId } = req.params
  try {
    const foundTrip = await Trip.findByPk(tripId)
    if (foundTrip) {
      await foundTrip.destroy()
      res.status(204).end()
    } else res.status(404).json({ message: 'Trip not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
