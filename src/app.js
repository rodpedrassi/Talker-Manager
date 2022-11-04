const express = require('express');

const crypto = require('crypto');

const {
    readTalkersData,
    readTalkersDataById,
  } = require('./utils/fsTalker');
  
  const app = express();
  
  app.use(express.json());

  app.get('/talker', async (req, res) => {
    const talkers = await readTalkersData();
    return res.status(200).json(talkers);
  });

  app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await readTalkersDataById(id);
    if (talker.length > 0) {
        return res.status(200).json(talker[0]);
    } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  });

  app.post('/login', async (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  });

  module.exports = app;