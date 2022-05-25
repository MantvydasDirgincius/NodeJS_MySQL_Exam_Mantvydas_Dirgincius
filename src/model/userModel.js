const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function addUserToDb(email, password, name) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)';
    const [result] = await conn.execute(sql, [email, password, name]);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    conn?.end();
  }
}
async function findUserByEmail(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    const sql = `
      SELECT * FROM users 
      WHERE email=?
         `;
    const [result] = await conn.execute(sql, [email]);
    return result;
  } catch (error) {
    return false;
  } finally {
    await conn?.end();
  }
}

module.exports = {
  addUserToDb,
  findUserByEmail,
};
