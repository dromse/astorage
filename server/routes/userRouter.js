const Router = require('express')
const { check } = require('express-validator')

const UserController = require('../controllers/userController')
const RoleMiddleware = require('../middleware/roleMiddleware')
const AuthMiddleware = require('../middleware/authMiddleware')

const role = require('../enums/roleEnum')

const router = new Router()

router.post(
  '/signup',

  check('name', 'Name cannot be empty.').notEmpty(),
  check('email', 'Email cannot be empty.').notEmpty(),
  check('password', 'Password cannot be empty.').notEmpty(),

  UserController.signup,
)

router.post(
  '/login',

  check('email', 'Email cannot be empty.').notEmpty(),
  check('password', 'Password cannot be empty.').notEmpty(),

  UserController.login,
)

router.get('/getAll', RoleMiddleware([role.USER]), UserController.getAll)

router.put(
  '/changeVisibility',

  AuthMiddleware,

  UserController.changeVisibility,
)

module.exports = router
