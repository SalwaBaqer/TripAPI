const { List } = require('../../db/models')
const { User } = require('../../db/models')

//list list xD
exports.listsFetch = async (req, res) => {
  try {
    const lists = await List.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
    })
    res.json(lists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete
exports.listDelete = async (req, res) => {
  const { listId } = req.params
  try {
    const foundList = await List.findByPk(listId)
    if (req.user.id === foundList.UserId) {
      if (foundList) {
        await foundList.destroy()
        res.status(204).end()
      } else res.status(404).json({ message: 'List not found' })
    } else res.status(401).json({ message: 'Unauthorized' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
//add list
exports.addlist = async (req, res) => {
  try {
    req.body.UserId = req.user.id
    const newList = await List.create(req.body)
    newList.dataValues.user = { username: req.user.username }
    console.log(newList)
    res.status(201).json(newList)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//update list
exports.updatelist = async (req, res, next) => {
  try {
    if (req.user.id === +req.body.UserId) {
      const foundList = await List.findByPk(req.params.listId)
      //list exist
      if (foundList) {
        await foundList.update(req.body)
        res.status(201).json(foundList)
      } else {
        res.status(404).json({ message: 'List not found' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    next(error)
  }
}

//add to list
exports.addTolist = async (req, res) => {
  try {
    //   req.body.UserId = req.user.id
    const newList = await Trip_List.create(req.body)
    //   newList.dataValues.user = { username: req.user.username }
    console.log(newList)
    res.status(201).json(newList)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
