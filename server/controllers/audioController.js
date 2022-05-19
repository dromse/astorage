const AudioService = require('../services/audioService')

class AudioController {
  async upload(req, res, next) {
    try {
      const { audio } = req.files

      const pathToFile = await AudioService.upload(audio)
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

  async getAll(req, res, next) {
    try {
      const audios = await AudioService.getAll()
      res.status(200).json({ audios })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new AudioController()
