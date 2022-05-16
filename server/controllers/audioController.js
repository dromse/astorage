const AudioService = require('../services/audioService')

class AudioController {
  async upload(req, res) {
    try {
      const { audio } = req.files

      AudioService.upload(audio).then((message) =>
        res.status(200).json({ message }),
      )
    } catch (e) {
      console.log(e.message)
    }
  }

  async download(req, res) {
    try {
      const { fileName } = req.params

      AudioService.download(fileName).then((pathToFile) =>
        res.status(200).download(pathToFile),
      )
    } catch (e) {
      console.log(e.message)
    }
  }

  async remove(req, res) {
    try {
      const { fileName } = req.params

      AudioService.remove(fileName).then((message) =>
        res.status(200).json({ message }),
      )
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new AudioController()
