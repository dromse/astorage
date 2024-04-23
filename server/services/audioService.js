const path = require('path')
const uuid = require('uuid')

const { Audio } = require('../models/models')
const ApiError = require('../exceptions/apiError')

const isFileExist = require('../utils/checkFileExist')
const removeFile = require('../utils/removeFile')
const { isWave, isMpeg, isAudioFile } = require('../utils/checkFileFormat')

const pathToStatic = path.resolve(__dirname, '..', 'static')

class AudioService {
  async upload(audioFile, audioInfo) {
    if (!isAudioFile(audioFile)) {
      throw ApiError.BadRequest('Not correct type. Must be mp3 or wav.')
    }

    let fileFormat

    if (isMpeg(audioFile)) {
      fileFormat = 'mp3'
    }

    if (isWave(audioFile)) {
      fileFormat = 'wav'
    }

    const fileId = uuid.v4()
    const fileName = `${fileId}.${fileFormat}`
    const pathToFile = path.resolve(pathToStatic, 'audio', fileName)
    audioFile.mv(pathToFile)

    await Audio.create({
      fileId,
      fileFormat,
      ...audioInfo,
    })

    return 'Audio was uploaded successfully.'
  }

  async download(fileId) {
    const audio = await Audio.findOne({ where: { fileId } })
    if (!audio) {
      throw ApiError.BadRequest('No data about audio in db.')
    }

    const fileName = `${audio.fileId}.${audio.fileFormat}`
    const pathToFile = path.resolve(pathToStatic, 'audio', fileName)

    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist on server.')
    }

    return pathToFile
  }

  async remove(fileId, userId) {
    const audio = await Audio.findOne({ where: { fileId, userId } })
    if (!audio) {
      throw ApiError.BadRequest('You cannot delete this audio.')
    }

    const fileName = `${audio.fileId}.${audio.fileFormat}`
    const pathToFile = path.resolve(pathToStatic, 'audio', fileName)

    if (!(await isFileExist(pathToFile))) {
      throw ApiError.BadRequest('File does not exist on server.')
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

  async updateData(fileId, userId, dataToUpdate) {
    const audio = await Audio.findOne({ where: { fileId } })

    if (audio.userId !== userId) {
      throw ApiError.BadRequest('Audio file does not belong to user.')
    }

    audio.update({ ...dataToUpdate })
    return audio
  }

  async getAll() {
    const audios = await Audio.findAll()
    return audios
  }
}

module.exports = new AudioService()
