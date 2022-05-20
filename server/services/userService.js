const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/models')

function generateToken(id, email, role) {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
}

class UserService {
  async singup(email, password) {
    // Deprecated
    // Need to delete when add express-validator
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

    const token = generateToken(user.id, user.email, user.role)

    return token
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw ApiError.BadRequest('This user is not registered.')
    }

    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      throw ApiError.BadRequest('Password is not valid.')
    }

    const token = generateToken(user.id, user.email, user.role)

    return token
  }

  async logout(refreshToken) {}

  async getAll() {
    const users = await User.findAll()
    return users
  }
}

module.exports = new UserService()
