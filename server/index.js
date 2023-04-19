require('dotenv').config();
require('express-async-errors');
const express = require('express');

const cors = require('cors');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const checkConnectionAndStartServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`The server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

checkConnectionAndStartServer();
