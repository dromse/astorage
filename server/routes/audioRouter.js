const Router = require('express')

const audioController = require('../controllers/audioController')

const router = new Router()

router.post('/', audioController.upload)
router.get('/:fileName', audioController.download)

module.exports = router
