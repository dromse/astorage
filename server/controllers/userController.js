const UserService = require('../services/userService')
const ApiError = require('../exceptions/apiError')
const { validationResult } = require('express-validator')

class UserController {
  async signup(req, res, next) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({ message: 'Registration Error.', errors })
      }

      const { email, password, name } = req.body

      const token = await UserService.singup(email, password, name)

      res.json({ token })
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json({ message: 'Login Error.', errors })
      }

      const { email, password } = req.body

      const token = await UserService.login(email, password)

      res.json({ token })
    } catch (err) {
      next(err)
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll()
      res.json(users)
    } catch (err) {
      next(err)
    }
  }

  async changeVisibility(req, res, next) {
    try {
      const { visibility } = req.body
      const user = req.user

      const newUser = await UserService.changeVisibility(user, visibility)
      res.status(200).json({ newUser })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UserController()
