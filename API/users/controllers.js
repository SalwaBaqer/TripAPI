/* Requires */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRATION_MS } = require('../../config/keys')

// Database
const { User } = require('../../db/models')
const { Trip } = require('../../db/models')
/* Requires */

exports.signup = async (req, res, next) => {
  const { password } = req.body
  const saltRounds = 10
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    console.log('exports.signup -> hashedPassword', hashedPassword)
    req.body.password = hashedPassword

    const newUser = await User.create(req.body)

    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      exp: Date.now() + JWT_EXPIRATION_MS,
    }

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET)
    res.status(201).json({ token })
  } catch (error) {
    next(error)
  }
}

exports.signin = (req, res) => {
  const { user } = req

  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  }

  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET)
  res.json({ token })
}

//list
exports.userList = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Trip,
          attributes: ['id', 'title', 'description', 'image'],
        },
      ],
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//list one user
exports.userFetch = async (req, res) => {
  const { userId } = req.params
  try {
    // const foundUser = await User.findByPk(userId)
    const foundUser = await User.findAll({
      where: { id: userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Trip,
          attributes: ['id', 'title', 'description', 'image'],
        },
      ],
    })
    // const users = await User.findAll({
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    //   include: [
    //     {
    //       model: Trip,
    //       attributes: ['id', 'title', 'description', 'image'],
    //     },
    //   ],
    // })
    res.json(foundUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
