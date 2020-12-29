const express = require('express')
const router = express.Router()
//passport
const passport = require('passport')
const {
  listsFetch,
  listDelete,
  addlist,
  updatelist,
  addTolist,
} = require('./controllers')

//list
router.get('/', listsFetch)

//delete trip
router.delete(
  '/:listId',
  passport.authenticate('jwt', { session: false }),
  listDelete
)

//add trip
// router.post('/', passport.authenticate('jwt', { session: false }), addlist)
//add trip
router.post('/', passport.authenticate('jwt', { session: false }), addTolist)

//update trip
router.put(
  '/:listId',
  passport.authenticate('jwt', { session: false }),
  updatelist
)

module.exports = router
