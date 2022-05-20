const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Audio = sequelize.define('audio', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileId: { type: DataTypes.STRING, unique: true, allowNull: false },
  fileFormat: { type: DataTypes.STRING, allowNull: false },
  visibility: { type: DataTypes.STRING, defaultValue: 'PUBLIC' },
})

// User.hasMany(Audio)
// Audio.belongsTo(User)

module.exports = {
  User,
  Audio,
}
