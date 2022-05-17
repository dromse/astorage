const path = require('path')
const fs = require('fs')

const ApiError = require('../exceptions/apiError')
const isFileExist = require('../utils/checkFileExist')
const removeFile = require('../utils/removeFile')

class AudioService {
  // takes audio file and save it to static directory
  async upload(audio) {
    // check file for audio file
    const isMpeg = audio.mimetype === 'audio/mpeg'
    const isWave = audio.mimetype === 'audio/wave'
    const isAudioFile = isMpeg || isWave

    if (!isAudioFile) {
      throw ApiError.BadRequest('Not correct type. Must be mp3 or wav.')
    }

    const pathToFile = path.resolve(__dirname, '..', 'static', audio.name)

    audio.mv(pathToFile)

    return pathToFile
  }

  // takes audio name and return path to file
  async download(fileName) {
    const pathToFile = path.resolve(__dirname, '..', 'static', fileName)

    if (!(await exists(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    return pathToFile
  }

  // takes audio name and delete audio file in static directory
  async remove(fileName) {
    const pathToFile = path.resolve(__dirname, '..', 'static', fileName)

    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    if (!(await removeFile(pathToFile))) {
      throw ApiError.BadRequest('Error while deleting file.')
    }

    return pathToFile
  }
}

module.exports = new AudioService()
