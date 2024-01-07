const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const listController = require('./controllers/listController');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Usando o middleware CORS
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authController);
app.use('/list', listController);

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
})