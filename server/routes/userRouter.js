const Router = require('express')

const UserController = require('../controllers/userController')

const router = new Router()

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/getUsers', UserController.getUsers)

module.exports = router
