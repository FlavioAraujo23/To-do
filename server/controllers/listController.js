const express = require('express');
const List = require('../models/list');

const router = express.Router();

// endpoint para criação de lista
router.post('/create', async (req, res) => {
  const { titulo, descricao, membro, userId } = req.body;

  const listData = {titulo,
                    descricao,
                    membro,
                    usuario_id: userId
                  };
  try {
    const list = await List.createListInDb(listData);

    res.json({list});
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'erro no servidor '});
  }
  

})

module.exports = router;