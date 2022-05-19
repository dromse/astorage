const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/models')

function generateTokens(id, email) {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
}

class UserService {
  async singup(email, password) {
    if (!email || !password) {
      throw ApiError.BadRequest('Email or password is empty.')
    }

    const candidate = await User.findOne({ where: { email } })

    if (candidate) {
      throw ApiError.BadRequest('This user already exists.')
    }

    const hashPassword = await bcrypt.hash(password, 3)

    const user = await User.create({
      email,
      password: hashPassword,
    })

    const token = generateTokens(user.id, user.email)

    return token
  }

  async login(email, password) {}

  async logout(refreshToken) {}

  async getUsers() {
    const users = await User.findAll()
    return users
  }
}

module.exports = new UserService()
