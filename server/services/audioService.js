const path = require('path')
const uuid = require('uuid')

const { Audio } = require('../models/models')
const ApiError = require('../exceptions/apiError')

const isFileExist = require('../utils/checkFileExist')
const removeFile = require('../utils/removeFile')
const { isWave, isMpeg, isAudioFile } = require('../utils/checkFileFormat')

const pathToStatic = path.resolve(__dirname, '..', 'static')

class AudioService {
  // takes audio file and save it to static directory
  async upload(file) {
    // check file for audio file
    if (!isAudioFile(file)) {
      throw ApiError.BadRequest('Not correct type. Must be mp3 or wav.')
    }

    // set file format
    let fileFormat

    if (isMpeg(file)) {
      fileFormat = 'mp3'
    }

    if (isWave(file)) {
      fileFormat = 'wav'
    }

    // generate path to file and save it to static dir
    const fileId = uuid.v4()
    const fileName = `${fileId}.${fileFormat}`
    const pathToFile = path.resolve(pathToStatic, fileName)
    file.mv(pathToFile)

    const audio = await Audio.create({
      fileId,
      fileFormat,
    })

    return audio
  }

  // takes audio name and return path to file
  async download(fileId) {
    // get data about file from db
    const audio = await Audio.findOne({ where: { fileId } })
    if (!audio) {
      throw ApiError.BadRequest('File does not exist.')
    }

    // generate path to file
    const fileName = `${audio.fileId}.${audio.fileFormat}`
    const pathToFile = path.resolve(pathToStatic, fileName)

    // check for existence
    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    return pathToFile
  }

  // takes audio name and delete audio file in static directory
  async remove(fileId) {
    // get data from db about file
    const audio = await Audio.findOne({ where: { fileId } })
    if (!audio) {
      throw ApiError.BadRequest('File does not exist.')
    }

    // generate path to file
    const fileName = `${audio.fileId}.${audio.fileFormat}`
    const pathToFile = path.resolve(pathToStatic, fileName)

    // check for existence
    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    // delete file
    if (!(await removeFile(pathToFile))) {
      throw ApiError.BadRequest('Error while deleting file.')
    }

    // delete info about file in db
    await audio.destroy()

    return `${fileId} was deleted.`
  }

  async getAll() {
    const audios = await Audio.findAll()
    return audios
  }
}

module.exports = new AudioService()
