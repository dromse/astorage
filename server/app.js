require('dotenv').config();

const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const router = require('./routes/index');
const errorMiddleware = require('./middleware/errorMiddleware');
const sequelize = require('./db');

const PORT: number = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.json());
app.use(fileUpload({}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));

app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started at ${PORT}.`));
  } catch (e) {
    console.log(e);
  }
};

start();
