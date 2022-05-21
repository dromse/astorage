const ApiError = require('../exceptions/apiError')
const AudioService = require('../services/audioService')

class AudioController {
  async upload(req, res, next) {
    try {
      const { audio } = req.files
      const { visibility, title } = req.body
      const user = req.user

      const audioInfo = {
        visibility,
        userId: user.id,
        title,
      }

      const pathToFile = await AudioService.upload(audio, audioInfo)

      res.status(200).json({ pathToFile })
    } catch (e) {
      next(e)
    }
  }

  async download(req, res, next) {
    try {
      const { fileId } = req.params

      const pathToFile = await AudioService.download(fileId)

      res.status(200).download(pathToFile)
    } catch (e) {
      next(e)
    }
  }

  async remove(req, res, next) {
    try {
      const { fileId } = req.params

      const pathToFile = await AudioService.remove(fileId)
      res.status(200).json({ pathToFile })
    } catch (e) {
      next(e)
    }
  }

  async getUserAudios(req, res, next) {
    try {
      const user = req.user
      const audios = await AudioService.getUserAudios(user.id)
      res.status(200).json({ audios })
    } catch (e) {
      next(e)
    }
  }

  async getAll(_, res, next) {
    try {
      const audios = await AudioService.getAll()
      res.status(200).json({ audios })
    } catch (e) {
      next(e)
    }
  }

  async changeVisibility(req, res, next) {
    try {
      const { fileId } = req.params
      const { visibility } = req.body
      const user = req.user

      if (!visibility) {
        next(ApiError.BadRequest('Visibility cannot be empty'))
      }

      const dataToUpdate = { visibility }

      const audio = await AudioService.updateData(
        fileId,
        user.id,
        dataToUpdate,
      )
      res.status(200).json({ audio })
    } catch (err) {
      next(err)
    }
  }

  async changeTitle(req, res, next) {
    try {
      const { fileId } = req.params
      const { title } = req.body
      const user = req.user

      if (!title) {
        next(ApiError.BadRequest('Title cannot be empty'))
      }

      const dataToUpdate = { title }

      const audio = await AudioService.updateData(
        fileId,
        user.id,
        dataToUpdate,
      )
      
      res.status(200).json({ audio })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new AudioController()
