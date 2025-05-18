const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const file = new JSONFile('./db.json');

const defaultData = { users: [], jobs: [] };
const db = new Low(file, defaultData);

async function initDB() {
  await db.read();

  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }
}

module.exports = { db, initDB };

