const express = require('express')
const router = express.Router()

const { listsFetch, listDelete, addlist, updatelist } = require('./controllers')

//list
router.get('/', listsFetch)

//delete trip
router.delete('/:listId', listDelete)

//add trip
router.post('/', addlist)

//update trip
router.put('/:listId', updatelist)

module.exports = router
