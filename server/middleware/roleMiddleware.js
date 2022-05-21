const jwt = require('jsonwebtoken')

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        res.status(403).json({ message: 'User is not authorized.' })
      }

      const { role } = jwt.verify(token, process.env.SECRET_KEY)
      let hasRole = false

      if (roles.includes(role)) {
        hasRole = true
      }

      if (!hasRole) {
        res.status(403).json({ message: 'You does not have access.' })
      }

      next()
    } catch (err) {
      return res
        .status(403)
        .json({ message: 'User is not authorized.', errors: err })
    }
  }
}
