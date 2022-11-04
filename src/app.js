const express = require('express');
const crypto = require('crypto');
const auth = require('./middlewares/auth');
const { validateLoginData } = require('./middlewares/validateLogin');
const { 
    validateName, 
    validateAge, 
    validateTalk, 
    validateRate,
    validateWatchAt, 
} = require('./middlewares/validateTalker');

const {
    readTalkersData,
    readTalkersDataById,
    writeNewTalker,
    updateTalkerById,
    deleteTalker,
  } = require('./utils/fsTalker');
  
const app = express();
  
app.use(express.json());

app.get('/talker/search', auth, async (req, res) => {
    const { q } = req.query;
    console.log(q);
    
    const allTalkers = await readTalkersData();
    const filteredTalkers = allTalkers.filter((e) => e.name.includes(q));
    return res.status(200).json(filteredTalkers);
  });

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

app.post('/login', validateLoginData, async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker', 
  auth,
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchAt,
  validateRate, 
  async (req, res) => {
    const newTalkerData = { ...req.body };

    const newTalker = await writeNewTalker(newTalkerData);
  
    return res.status(201).json(newTalker);
});

app.put('/talker/:id', 
  auth,
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatchAt,
  validateRate, 
  async (req, res) => {
    const { id } = req.params;
    const newTalkerData = req.body;
  
    const editedTalker = await updateTalkerById(Number(id), newTalkerData); 
  
    return res.status(200).json(editedTalker);
});

app.delete('/talker/:id', auth, async (req, res) => {
    const { id } = req.params;
    deleteTalker(Number(id));
    return res.status(204).end();
});

  module.exports = app;