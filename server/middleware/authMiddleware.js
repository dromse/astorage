const ApiError = require('../exceptions/apiError')
const TokenService = require('../services/tokenService')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1]

    if (!accessToken) {
      next(ApiError.Unauthorized())
    }

    const payload = TokenService.validateAccessToken(accessToken)

    if (!payload) {
      next(ApiError.Unauthorized())
    }

    req.user = payload
    next()
  } catch (e) {
    return next(ApiError.Unauthorized())
  }
}
