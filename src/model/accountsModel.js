const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getAccounts(id) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);

    // eslint-disable-next-line operator-linebreak
    const sql =
      'SELECT group_id, user_id, name FROM accounts LEFT JOIN groups ON accounts.group_id = groups.id LEFT JOIN users ON accounts.user_id = users.id WHERE users.id = ?';
    const [result] = await conn.execute(sql, [id]);
    return result;
  } catch (error) {
    throw error.message;
  } finally {
    await conn?.end();
  }
}

async function postAccounts(groupId, userId) {
  let conn;

  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO accounts (group_id , user_id) VALUES (? , ?)';
    const [result] = await conn.execute(sql, [groupId, userId]);
    return result;
  } catch (error) {
    console.log('error ===', error);
    throw error.message;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getAccounts,
  postAccounts,
};
