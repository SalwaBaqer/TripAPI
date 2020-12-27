const express = require('express')

//controllers
const { tripsList, addtrip, updatetrip, tripDelete } = require('./controllers')

//passport
const passport = require('passport')

//upload images
const upload = require('../../middleware/multer')

const router = express.Router()

//list
router.get('/', tripsList)

//add trip
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  addtrip
)

//update trip
router.put(
  '/:tripId',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  updatetrip
)

//delete trip
router.delete(
  '/:tripId',
  passport.authenticate('jwt', { session: false }),
  tripDelete
)

module.exports = router
