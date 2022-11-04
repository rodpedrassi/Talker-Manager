const fs = require('fs').promises;
const path = require('path');

const TALKER_PATH = path.resolve(__dirname, '../talker.json');

async function readTalkersData() {
  const data = await fs.readFile(TALKER_PATH, 'utf-8');
  const talkers = JSON.parse(data);

  return talkers;
}

module.exports = {
    readTalkersData,
};