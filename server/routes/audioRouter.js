const Router = require('express')

const AudioController = require('../controllers/audioController')
const RoleMiddleware = require('../middleware/roleMiddleware')

const router = new Router()

router.post('/', RoleMiddleware(['USER']), AudioController.upload)

router.get('/getAll', RoleMiddleware(['USER']), AudioController.getAll)
router.get('/:fileId', RoleMiddleware(['USER']), AudioController.download)

router.delete('/:fileId', RoleMiddleware(['USER']), AudioController.remove)

module.exports = router
