const express = require('express');

const {
    readTalkersData,
  } = require('./utils/fsTalker');
  
  const app = express();
  
  app.use(express.json());

  app.get('/talker', async (req, res) => {
    const talkers = await readTalkersData();
    return res.status(200).json(talkers);
  });

  module.exports = app;