const path = require('path')
const uuid = require('uuid')

const { Audio } = require('../models/models')
const ApiError = require('../exceptions/apiError')

const isFileExist = require('../utils/checkFileExist')
const removeFile = require('../utils/removeFile')
const { isWave, isMpeg, isAudioFile } = require('../utils/checkFileFormat')

const pathToStatic = path.resolve(__dirname, '..', 'static')

class AudioService {
  async upload(file, audioInfo) {
    if (!isAudioFile(file)) {
      throw ApiError.BadRequest('Not correct type. Must be mp3 or wav.')
    }

    let fileFormat

    if (isMpeg(file)) {
      fileFormat = 'mp3'
    }

    if (isWave(file)) {
      fileFormat = 'wav'
    }

    const fileId = uuid.v4()
    const fileName = `${fileId}.${fileFormat}`
    const pathToFile = path.resolve(pathToStatic, fileName)
    file.mv(pathToFile)

    const audio = await Audio.create({
      fileId,
      fileFormat,
      ...audioInfo,
    })

    return audio
  }

  async download(fileId) {
    const audio = await Audio.findOne({ where: { fileId } })
    if (!audio) {
      throw ApiError.BadRequest('File does not exist.')
    }

    const fileName = `${audio.fileId}.${audio.fileFormat}`
    const pathToFile = path.resolve(pathToStatic, fileName)

    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    return pathToFile
  }

  async remove(fileId) {
    const audio = await Audio.findOne({ where: { fileId } })
    if (!audio) {
      throw ApiError.BadRequest('File does not exist.')
    }

    const fileName = `${audio.fileId}.${audio.fileFormat}`
    const pathToFile = path.resolve(pathToStatic, fileName)

    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist.')
    }

    if (!(await removeFile(pathToFile))) {
      throw ApiError.BadRequest('Error while deleting file.')
    }

    await audio.destroy()

    return `${fileId} was deleted.`
  }

  async getUserAudios(userId) {
    const audios = await Audio.findAll({ where: { userId } })
    return audios
  }

  async updateData(fileId, userId, dataToChange) {
    const audio = await Audio.findOne({ where: { fileId } })

    if (audio.userId !== userId) {
      throw ApiError.BadRequest('Audio file does not belong to user.')
    }

    audio.update({ ...dataToChange })
    return audio
  }

  async getAll() {
    const audios = await Audio.findAll()
    return audios
  }
}

module.exports = new AudioService()
