const express = require('express')
const { tripsList, tripDelete } = require('./controllers')

const router = express.Router()

//get
router.get('/trips', tripsList)

//delete
router.delete('/:tripId', tripDelete)

module.exports = router
