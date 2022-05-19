const UserService = require('../services/userService')
const ApiError = require('../exceptions/apiError')

class UserController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body

      const token = await UserService.singup(email, password)

      return res.json({ token })
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    // try {
    //   const { email, password } = req.body
    //
    //   const token = await UserService.login(email, password)
    //
    //   return res.json({ token })
    // } catch (err) {
    //   next(err)
    // }
  }

  async logout(req, res, next) {
    // try {
    //   const { refreshToken } = req.cookies
    //
    //   const token = await UserService.logout(refreshToken)
    //   res.cleanCookie('refreshToken')
    //
    //   return res.json(token)
    // } catch (err) {
    //   next(err)
    // }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers()
      return res.json(users)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UserController()
