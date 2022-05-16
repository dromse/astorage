const path = require('path')

class AudioService {
  // takes audio file and save it to static directory
  async upload(audio) {
    // check file for audio file
    const isMpeg = audio.mimetype === 'audio/mpeg' 
    const isWave = audio.mimetype === 'audio/wave'
    const isAudioFile = isMpeg || isWave

    if (!isAudioFile) {
      return 'Not correct type. Must be mp3 or wav.'
    }

    const pathToFile = path.resolve(__dirname, '..', 'static', audio.name)

    audio.mv(pathToFile)

    return 'Audio file was uploaded successfully.'
  }

  // takes audio name and return path to file
  async download(fileName) {
    const pathToFile = path.resolve(__dirname, '..', 'static', fileName)
    return pathToFile
  }
}

module.exports = new AudioService()
