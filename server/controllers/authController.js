const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// endpoint para login
router.post('/login', async (req, res) => {
  const {email, senha} = req.body;
  console.log(email, senha)
   // Validação de email
   const emailIsValid = /\S+@\S+\.\S+/.test(email);

   // Validação de senha
   const passwordIsValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(senha);
   
  if(!passwordIsValid || !emailIsValid) {
    return res.status(401).json({ message: 'Credenciais invalidas'}); 
  }

  try {
    const user = await User.findByEmail(email);
    
    if(user && bcrypt.compareSync(senha, user.senha)) {
      // Auth bem sucedida
      return res.json({
        userId: user.id,
        nome: user.nome_completo,
        email: user.email
      });
    } else {
      return res.status(401).json({ message: 'Credenciais invalidas'}); 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'erro no servidor '});
  }
});

//endpoint para cadastro de usuário
router.post('/createAccount', async (req, res) => {
  const {nome, email, senha} = req.body;
  try{
    const existingUser = await User.findByEmail(email);
    if(existingUser) {
      return res.json({message: "Email já cadastrado"});
    }

    const newUser = await User.createUser(nome, email, senha);
    return res.json({message: 'Usuário criado com sucesso!', userId: newUser.id});

  } catch(error) {
    console.log(error);
    res.status(500).json({message: 'Erro no servidor'});
  }
});

module.exports = router;