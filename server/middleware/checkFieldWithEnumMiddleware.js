const visibilityEnum = require('../enums/visibilityEnum')

const ApiError = require('../exceptions/apiError')

module.exports = function (propToCheck, enumWithProps) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const prop = req.body[propToCheck]

      if (!prop) {
        next(ApiError.BadRequest(`Body must contain field: ${propToCheck}.`))
      }

      if (!Object.getOwnPropertyNames(enumWithProps).includes(prop)) {
        next(
          ApiError.BadRequest(
            `${prop} is not defined. You can use: ${Object.getOwnPropertyNames(
              enumWithProps,
            )}`,
          ),
        )
      }

      next()
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Error while checking ${prop}.`, errors: err })
    }
  }
}

