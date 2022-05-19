const Router = require('express')

const AudioRouter = require('./audioRouter')
const UserRouter = require('./userRouter')

const router = new Router()

router.use('/audio', AudioRouter)
router.use('/user', UserRouter)

module.exports = router
