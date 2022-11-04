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

  const validateLoginData = (req, res, next) => {
    const loginData = { ...req.body };
    if (!Object.keys(loginData).some((e) => e === 'email')) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } 
    const validRegex = /[a-z0-9]+@[a-z]+\.[a-z]/;
    if (!loginData.email.match(validRegex)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!Object.keys(loginData).some((e) => e === 'password')) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } 
    console.log(loginData.password.length);
    if (loginData.password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 
    
    next();
  };

  app.post('/login', validateLoginData, async (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  });

  module.exports = app;