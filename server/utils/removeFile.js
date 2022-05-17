const { promises: Fs } = require('fs')

async function removeFile (path) {  
  try {
    await Fs.unlink(path)
    return true
  } catch {
    return false
  }
}

module.exports = removeFile

