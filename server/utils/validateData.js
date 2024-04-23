const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')

// validate data, use express-validator
function validate(req, typeOfError) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw ApiError.BadRequest(typeOfError, errors)
  }
}

module.exports = validate
