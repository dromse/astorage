const Router = require('express')

const AudioController = require('../controllers/audioController')

const router = new Router()

router.post('/', AudioController.upload)
router.get('/:fileName', AudioController.download)
router.delete('/:fileName', AudioController.remove)

module.exports = router
