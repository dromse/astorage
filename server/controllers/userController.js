const UserService = require('../services/userService')
const ApiError = require('../exceptions/apiError')

const validate = require('../utils/validateData')

// 30 days
const maxAge = 30 * 24 * 60 * 60 * 1000

class UserController {
  async signup(req, res, next) {
    try {
      validate(req, 'Registration Error')

      const { email, password, username } = req.body

      const userData = await UserService.singup(email, password, username)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge,
        httpOnly: true,
      })

      return res.json({ userData })
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      validate(req, 'Login Error')

      const { email, password } = req.body

      const userData = await UserService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge,
        httpOnly: true,
      })

      return res.json({ userData })
    } catch (err) {
      next(err)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await UserService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge,
        httpOnly: true,
      })

      return res.json({ userData })
    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies

      if (!refreshToken) {
        return ApiError.BadRequest('refreshToken was not found.')
      }

      const result = await UserService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(result)
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
      const userId = req.user.id

      const user = await UserService.updateData(userId, { visibility })
      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }

  async changeUsername(req, res, next) {
    try {
      validate(req, 'Change username Error.')

      const { username } = req.body
      const userId = req.user.id

      const user = await UserService.updateData(userId, { username })

      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }

  async changeEmail(req, res, next) {
    try {
      validate(req, 'Change Email Error')

      const { email } = req.body
      const userId = req.user.id

      const user = await UserService.updateData(userId, { email })

      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }

  async changePasswordByLink(req, res, next) {
    try {
      validate(req, 'Change Password Error')

      const { password } = req.body
      const { changePasswordLink } = req.params

      const user = await UserService.changePasswordByLink(
        changePasswordLink,
        password,
      )

      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }

  async changePassword(req, res, next) {
    try {
      validate(req, 'Change Password Error')

      const { password } = req.body
      const userId = req.user.id

      const user = await UserService.changePassword(userId, password)

      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }

  async changeProfilePhoto(req, res, next) {
    try {
      validate(req, 'Change Profile Photo Error')

      const { profile_photo } = req.files
      const userId = req.user.id

      const user = await UserService.changeProfilePhoto(userId, profile_photo)

      res.status(200).json({ user })
    } catch (err) {
      next(err)
    }
  }

  async getProfilePhoto(req, res, next) {
    try {
      const { id } = req.params

      const profilePhotoPath = await UserService.getProfilePhoto(id)

      return res.download(profilePhotoPath)
    } catch (err) {
      next(err)
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.user.id

      const result = await UserService.deleteUser(userId)

      return res.json({ result })
    } catch (err) {
      next(err)
    }
  }

  async deleteProfilePhoto(req, res, next) {
    try {
      const userId = req.user.id

      const user = await UserService.changeProfilePhoto(userId, null)

      return res.json({ user })
    } catch (err) {
      next(err)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.activationLink
      await UserService.activate(activationLink)

      return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UserController()
