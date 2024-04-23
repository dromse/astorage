const jwt = require('jsonwebtoken')
const { Token } = require('../models/models')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    })

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })

    return { accessToken, refreshToken }
  }

  validateAccessToken(accessToken) {
    try {
      const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      return payload
    } catch (err) {
      return null
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      return payload
    } catch (err) {
      return null
    }
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenFromDb = await Token.findOne({ where: { id: userId } })

    if (tokenFromDb) {
      return tokenFromDb.update({ refreshToken })
    }

    const token = await Token.create({ userId, refreshToken })
    return token
  }

  async removeToken(refreshToken) {
    const tokenFromDb = await Token.findOne({ where: { refreshToken } })
    const result = tokenFromDb.destroy()
    return result
  }

  async findTokenInDb(refreshToken) {
    const tokenFromDb = await Token.findOne({ where: { refreshToken }})
    return tokenFromDb
  }
}

module.exports = new TokenService()
