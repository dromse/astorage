const Router = require('express')

const audioRouter = require('./audioRouter')
// const userRouter = require('./userRouter')

const router = new Router()

router.use('/audio', audioRouter)
// router.use('/user', userRouter)

module.exports = router
