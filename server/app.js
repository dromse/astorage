require('dotenv').config()

const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const router = require('./routes/index')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())

// TODO: upload and download audio files in format mp3 and wav
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'working!' })
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started at ${PORT}.`))
  } catch (e) {
    console.log(e)
  }
}

start()
