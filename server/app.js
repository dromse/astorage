require('dotenv').config()

const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const router = require('./routes/index')
const errorMiddleware = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started at ${PORT}.`))
  } catch (e) {
    console.log(e)
  }
}

start()
