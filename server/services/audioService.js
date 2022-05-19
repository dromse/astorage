const path = require('path')
const uuid = require('uuid')

const ApiError = require('../exceptions/apiError')
const isFileExist = require('../utils/checkFileExist')
const removeFile = require('../utils/removeFile')

const pathToStatic = path.resolve(__dirname, '..', 'static')

class AudioService {
  // takes audio file and save it to static directory
  async upload(audio) {
    // check file for audio file
    const isMpeg = audio.mimetype === 'audio/mpeg'
    const isWave = audio.mimetype === 'audio/wave'
    const isAudioFile = isMpeg || isWave

    let fileName

    if (!isAudioFile) {
      throw ApiError.BadRequest('Not correct type. Must be mp3 or wav.')
    }

    if (isMpeg) {
      fileName = uuid.v4() + '.mp3'
    }

    if (isWave) {
      fileName = uuid.v4() + '.wav'
    }

    const pathToFile = path.resolve(pathToStatic, fileName)

    audio.mv(pathToFile)

    return fileName
  }

  // takes audio name and return path to file
  async download(fileName) {
    const pathToFile = path.resolve(pathToStatic, fileName)

    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    return pathToFile
  }

  // takes audio name and delete audio file in static directory
  async remove(fileName) {
    const pathToFile = path.resolve(pathToStatic, fileName)

    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    if (!(await removeFile(pathToFile))) {
      throw ApiError.BadRequest('Error while deleting file.')
    }

    return `${fileName} was deleted.`
  }
}

module.exports = new AudioService()
