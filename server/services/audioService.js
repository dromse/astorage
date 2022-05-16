const path = require('path')

class AudioService {
  async upload(audio) {
    audio.mv(path.resolve(__dirname, '..', 'static', audio.name))
  }

  async download(fileName) {
    const pathToFile = path.resolve(__dirname, '..', 'static', fileName)
    return pathToFile
  }
}

module.exports = new AudioService()
