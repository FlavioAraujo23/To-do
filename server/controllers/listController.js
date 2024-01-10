const express = require('express');
const List = require('../models/list');
const Pusher = require('../models/pusher');
const User = require('../models/user');

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
    const channel = await Pusher.createWsChannelWithPusher(list);
    const id = list.id
    res.json({id, channel});
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'erro no servidor'});
  }
})

// endpoint para busca de listas
router.post('/getList', async (req, res) => {
  const {userId} = req.body;

  try{
    const userListData = await List.getListsById(userId);
    res.json({userListData});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "erro no servidor"});
  }
})

// endpoint para convidar usuário para lista
router.post('/invite', async (req, res) => {
  const {inviteEmail, listId, ownerId, name} = req.body;
  
  try{
    const user = await User.findByEmail(inviteEmail);
    const result = await List.inviteUserForList(listId, user.id, ownerId, name);
    res.json({result})
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "erro no servidor"});
  }
})

// endpoint para criar todo
router.post('/todoCreate', async (req, res) => {
  const {title, progress, member, description, listId, channelName} = req.body;

  try {
    const result = await List.createTodoInDb(title, progress, member, description, listId);
    await Pusher.createEventInPusher(channelName, result);
    res.json([result.id]);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "erro no servidor"});
  }
})

module.exports = router;