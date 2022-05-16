const AudioService = require('../services/audioService')

class AudioController {
  async upload(req, res) {
    try {
      const { audio } = req.files

      AudioService.upload(audio)

      return res.status(200).json('Audio file was uploaded.')
    } catch (e) {
      console.log(e.message)
    }
  }

  async download(req, res) {
    try {
      const { fileName } = req.params

      pathToFile = AudioService.download(fileName)

      res.status(200).download(pathToFile)
    } catch (e) {
      console.log(e.message)
    }
  }
}

module.exports = new AudioController()
