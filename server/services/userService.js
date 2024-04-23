const path = require('path')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const { User } = require('../models/models')
const ApiError = require('../exceptions/apiError')
const UserDto = require('../dtos/userDto')
const TokenService = require('../services/tokenService')

const pathToStatic = path.resolve(__dirname, '..', 'static')

class UserService {
  async singup(email, password, username) {
    const candidate = await User.findOne({ where: { email } })

    if (candidate) {
      throw ApiError.BadRequest('Email is already exists.')
    }

    const hashPassword = await bcrypt.hash(password, 3)

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    })

    const userDto = new UserDto(user)

    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw ApiError.BadRequest('This user is not registered.')
    }

    const isPassEquals = bcrypt.compareSync(password, user.password)
    if (!isPassEquals) {
      throw ApiError.NotValidPassword()
    }

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken) {
    const result = await TokenService.removeToken(refreshToken)
    return result
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized()
    }

    const userFromJwt = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findTokenInDb(refreshToken)

    if (!userFromJwt || !tokenFromDb) {
      throw ApiError.Unauthorized()
    }

    const user = await User.findOne({ where: { id: userFromJwt.id } })
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAll() {
    const users = await User.findAll()
    return users
  }

  async updateData(userId, dataToUpdate) {
    const user = await User.findOne({ where: { id: userId } })
    user.update({ ...dataToUpdate })
    return user
  }

  async changePassword(userId, password) {
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await this.updateData(userId, { password: hashPassword })
    return user
  }

  async changeProfilePhoto(userId, photo) {
    if (!photo) {
      const user = await User.findOne({ where: { id: userId } })

      user.update({ profile_photo: 'default' })

      return 'Profile photo set to default.'
    }

    if (photo.mimetype !== 'image/jpeg') {
      throw ApiError.BadRequest('Profile photo must be jpeg format.')
    }

    const fileId = uuid.v4()
    const fileName = `${fileId}.jpg`
    const pathToFile = path.resolve(
      pathToStatic,
      'image',
      'profile_photo',
      fileName,
    )
    photo.mv(pathToFile)

    const user = await User.findOne({ where: { id: userId } })
    user.update({ profile_photo: fileId })
    return user
  }

  async getProfilePhoto(id) {
    const user = await User.findOne({ where: { id } })

    let profilePhotoName

    if (user.profile_photo) {
      profilePhotoName = user.profile_photo + '.jpg'
    } else {
      profilePhotoName = 'default.jpg'
    }

    const profilePhotoPath = path.resolve(
      pathToStatic,
      'image',
      'profile_photo',
      profilePhotoName,
    )

    return profilePhotoPath
  }

  async deleteUser(userId) {
    const user = await User.findOne({ where: { userId } })
    return user.destroy()
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } })

    if (!user) {
      throw ApiError.BadRequest('Non correct activation link.')
    }

    user.update({ isActivated: true })
  }

  async changePasswordByLink(changePasswordLink, password) {
    const forgetPassword = await ForgetPassword.findOne({
      where: { changePasswordLink },
    })

    if (!forgetPassword) {
      throw ApiError.BadRequest('You cannot change password with this link.')
    }

    const candidate = await User.findOne({
      where: { id: forgetPassword.userId },
    })

    if (!candidate) {
      throw ApiError.BadRequest('User not found.')
    }

    const user = await this.changePassword(candidate.id, password)

    return user
  }
}

module.exports = new UserService()
