const ApiError = require('../exceptions/apiError');
const TokenService = require('../services/tokenService');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const accessToken = req.params.token;
    console.log(accessToken);

    if (!accessToken) {
      next(ApiError.Unauthorized());
    }

    const payload = TokenService.validateAccessToken(accessToken);

    req.user = payload;
    next();
  } catch (e) {
    return next(ApiError.Unauthorized());
  }
};
