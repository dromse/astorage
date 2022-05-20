const Router = require('express')

const UserController = require('../controllers/userController')
const RoleMiddleware = require('../middleware/roleMiddleware')

const router = new Router()

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/getAll', RoleMiddleware(['USER']), UserController.getAll)

module.exports = router
