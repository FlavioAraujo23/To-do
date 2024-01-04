const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/auth', authController);

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
})