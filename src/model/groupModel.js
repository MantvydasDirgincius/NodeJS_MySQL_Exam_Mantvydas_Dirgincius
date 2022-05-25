const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getGoups() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = 'SELECT * FROM groups ';
    const [result] = await conn.execute(sql);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    await conn?.end();
  }
}
async function postGoups(name) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = 'INSERT INTO groups(name) VALUES (?)';
    const [result] = await conn.execute(sql, [name]);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    await conn?.end();
  }
}
module.exports = { getGoups, postGoups };
