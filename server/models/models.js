const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const roles = require('../enums/roleEnum')
const visibility = require('../enums/visibilityEnum')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: roles.USER },
  visibility: { type: DataTypes.STRING, defaultValue: visibility.PUBLIC },
})

const Audio = sequelize.define('audio', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileId: { type: DataTypes.STRING, unique: true, allowNull: false },
  fileFormat: { type: DataTypes.STRING, allowNull: false },
  visibility: { type: DataTypes.STRING, defaultValue: visibility.PUBLIC },
  title: { type: DataTypes.STRING, defaultValue: 'Unknown' },
})

User.hasMany(Audio)
Audio.belongsTo(User)

module.exports = {
  User,
  Audio,
}
