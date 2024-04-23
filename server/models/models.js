const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const roles = require('../enums/roleEnum');
const visibility = require('../enums/visibilityEnum');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Unknown User',
  },
  role: { type: DataTypes.STRING, defaultValue: roles.USER },
  visibility: { type: DataTypes.STRING, defaultValue: visibility.PUBLIC },
  profile_photo: { type: DataTypes.STRING, defaultValue: 'default' },
});

const Audio = sequelize.define('audio', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fileId: { type: DataTypes.STRING, unique: true, allowNull: false },
  fileFormat: { type: DataTypes.STRING, allowNull: false },
  visibility: { type: DataTypes.STRING, defaultValue: visibility.PUBLIC },
  cover: { type: DataTypes.STRING, defaultValue: 'default' },
  title: { type: DataTypes.STRING, defaultValue: 'Unknown' },
});

const Token = sequelize.define('token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, unique: true },
});

User.hasMany(Audio);
Audio.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

module.exports = {
  User,
  Audio,
  Token,
};
