const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
  const {email, senha} = req.body;

  try {
    const user = await User.findByEmail(email);
    
    if(user && bcrypt.compareSync(senha, user.senha)) {
      // Auth bem sucedida
      return res.json({ userId: user.id});
    } else {
      return res.status(401).json({ message: 'Credenciais invalidas'}); 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'erro no servidor '});
  }
});

module.exports = router;