const ApiError = require('../exceptions/apiError')
const TokenService = require('../services/tokenService')

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const accessToken = req.headers.authorization.split(' ')[1]

      if (!accessToken) {
        next(ApiError.Unauthorized())
      }

      const { role } = TokenService.validateAccessToken(accessToken)
      let hasRole = false

      if (roles.includes(role)) {
        hasRole = true
      }

      if (!hasRole) {
        next(ApiError.BadRequest('You does not have access.'))
      }

      next()
    } catch (err) {
      next(ApiError.Unauthorized())
    }
  }
}
