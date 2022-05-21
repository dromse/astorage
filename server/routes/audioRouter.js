const Router = require('express')

const AudioController = require('../controllers/audioController')
const RoleCheck = require('../middleware/roleMiddleware')
const AuthCheck = require('../middleware/authMiddleware')

const role = require('../enums/roleEnum')

const router = new Router()

router.post('/', AuthCheck, AudioController.upload)

router.get('/getAll', RoleCheck([role.USER]), AudioController.getAll)
router.get('/', AuthCheck, AudioController.getUserAudios)
router.get('/:fileId', AuthCheck, AudioController.download)

router.put(
  '/changeVisibility/:fileId',
  AuthCheck,
  AudioController.changeVisibility,
)

router.put('/changeTitle/:fileId', AuthCheck, AudioController.changeTitle)

router.delete('/:fileId', AuthCheck, AudioController.remove)

module.exports = router
