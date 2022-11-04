const fs = require('fs').promises;
const path = require('path');

const TALKER_PATH = path.resolve(__dirname, '../talker.json');

async function readTalkersData() {
  const data = await fs.readFile(TALKER_PATH, 'utf-8');
  const talkers = JSON.parse(data);

  return talkers;
}

async function readTalkersDataById(id) {
  const allTalkers = await readTalkersData();
  const talker = allTalkers.filter((e) => Number(id) === Number(e.id));
  return talker;
}

async function writeNewTalker(newTalker) {
    const oldTalkers = await readTalkersData();
    const newTalkerWithId = { id: oldTalkers[oldTalkers.length - 1].id + 1, ...newTalker };
    const newTalkers = JSON.stringify([...oldTalkers, newTalkerWithId]);
  
    await fs.writeFile(path.resolve(TALKER_PATH), newTalkers);
  
    return newTalkerWithId;
}

async function updateTalkerById(id, updatedTalker) {
    const oldTalkers = await readTalkersData();
    const newTalker = { id, ...updatedTalker };
  
    const updatedTalkers = oldTalkers.reduce((talker, currentTalker) => {
      if (currentTalker.id === id) return [...talker, newTalker];
      return [...talker, currentTalker];
    }, []);
  
    const updatedData = JSON.stringify(updatedTalkers);
    await fs.writeFile(path.resolve(TALKER_PATH), updatedData);
  
    return newTalker;
  }

  async function deleteTalker(id) {
    const oldTalkers = await readTalkersData();
    const updatedTalkers = oldTalkers.filter((mission) => mission.id !== id);
    const updatedData = JSON.stringify(updatedTalkers);
  
    await fs.writeFile(path.resolve(TALKER_PATH), updatedData);
  }

module.exports = {
    readTalkersData,
    readTalkersDataById,
    writeNewTalker,
    updateTalkerById,
    deleteTalker,
};