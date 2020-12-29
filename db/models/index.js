'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}
const User = require('./User')
const Trip = require('./Trip')
const List = require('./List')

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

//Relations
db.User.hasMany(db.Trip, {
  foreignKey: { fieldName: 'userId', allowNull: false },
  as: 'trips',
})

//trip belongs to one user only
db.Trip.belongsTo(db.User, {
  foreignKey: { fieldName: 'userId' },
  as: 'user',
})

// A profile must have one user only
db.Profile.hasOne(db.User, {
  foreignKey: 'profileId',
  allowNull: false,
})
db.User.belongsTo(db.Profile, {
  foreignKey: 'profileId',
})

//many to many between lists and users
db.Trip.belongsToMany(db.List, { through: 'Trip_Lists' })
db.List.belongsToMany(db.Trip, { through: 'Trip_Lists' })

//one to many between user and lists
db.User.hasMany(db.List)
db.List.belongsTo(db.User)

module.exports = db
