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

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Verifica se o erro é do tipo 'ValidationError'
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
})