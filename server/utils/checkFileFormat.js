const isMpeg = (file) => file.mimetype === 'audio/mpeg'
const isWave = (file) => file.mimetype === 'audio/wave'
const isAudioFile = (file) => isMpeg(file) || isWave(file)

module.exports = {
  isMpeg,
  isWave,
  isAudioFile,
}
