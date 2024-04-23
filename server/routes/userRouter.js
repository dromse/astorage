const Router = require('express')
const { check } = require('express-validator')

const UserController = require('../controllers/userController')
const RoleMiddleware = require('../middleware/roleMiddleware')
const AuthMiddleware = require('../middleware/authMiddleware')
const CheckFieldWithEnum = require('../middleware/checkFieldWithEnumMiddleware')

const Role = require('../enums/roleEnum')
const Visibility = require('../enums/visibilityEnum')

const router = new Router()

// auth
router.post(
  '/signup',

  check('username', 'Username cannot be empty.').notEmpty(),
  check('email', 'Email cannot be empty.').notEmpty(),
  check('password', 'Password cannot be empty.').notEmpty(),

  UserController.signup,
)

router.post('/activate/:activationLink', UserController.activate)

router.post(
  '/login',

  check('email', 'Email cannot be empty.').notEmpty(),
  check('password', 'Password cannot be empty.').notEmpty(),

  UserController.login,
)

router.post('/logout', UserController.logout)

router.post('/refresh', UserController.refresh)

// router.post('/forgetPassword', UserController.forgetPassword)
router.post(
  '/forgetPassword/:changePasswordLink',
  UserController.changePasswordByLink,
)

// getters
router.get('/getAll', RoleMiddleware([Role.USER]), UserController.getAll)
router.get('/getProfilePhoto/:id', UserController.getProfilePhoto)

// changers
router.put(
  '/changeVisibility',

  CheckFieldWithEnum('visibility', Visibility),
  AuthMiddleware,

  UserController.changeVisibility,
)

router.put(
  '/changeUsername',

  check('username', 'Username cannot be empty.').notEmpty(),
  AuthMiddleware,

  UserController.changeUsername,
)

router.put(
  '/changeProfilePhoto',

  AuthMiddleware,

  UserController.changeProfilePhoto,
)

router.put(
  '/changeEmail',

  check('email', 'Email cannot be empty.').notEmpty(),
  AuthMiddleware,

  UserController.changeEmail,
)

router.put(
  '/changePassword',

  check('password', 'Password cannot be empty.').notEmpty(),
  AuthMiddleware,

  UserController.changePassword,
)

// delete
router.delete('/deleteUser', AuthMiddleware, UserController.deleteUser)
router.delete(
  '/deleteProfilePhoto',
  AuthMiddleware,
  UserController.deleteProfilePhoto,
)

module.exports = router
