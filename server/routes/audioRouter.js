const Router = require('express')

const { check } = require('express-validator')

const AudioController = require('../controllers/audioController')
const RoleCheck = require('../middleware/roleMiddleware')
const AuthCheck = require('../middleware/authMiddleware')
const AuthFromParamsToken = require('../middleware/authFromParamsTokenMiddleware')
const CheckFieldWithEnum = require('../middleware/checkFieldWithEnumMiddleware')

const Role = require('../enums/roleEnum')
const Visibility = require('../enums/visibilityEnum')

const router = new Router()

router.post('/upload', AuthCheck, AudioController.upload)

router.get('/getAll', RoleCheck([Role.USER]), AudioController.getAll)
router.get('/getUserAudios', AuthCheck, AudioController.getUserAudios)
router.get('/download/:token/:fileId', AuthFromParamsToken, AudioController.download)

router.put(
  '/changeVisibility/:fileId',

  CheckFieldWithEnum('visibility', Visibility),
  AuthCheck,

  AudioController.changeVisibility,
)

router.put(
  '/changeTitle/:fileId',
  check('title', 'Title cannot be empty.').notEmpty(),
  AuthCheck,
  AudioController.changeTitle,
)

router.delete('/delete/:fileId', AuthCheck, AudioController.remove)

module.exports = router
