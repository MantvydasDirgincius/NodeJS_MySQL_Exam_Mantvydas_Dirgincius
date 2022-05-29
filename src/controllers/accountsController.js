const { getAccounts, postAccounts } = require('../model/accountsModel');

const getAccount = async (req, res) => {
  try {
    const id = req.userId;
    const data = await getAccounts(id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};
const postAccount = async (req, res) => {
  try {
    const id = req.userId;
    const { groupId } = req.body;
    const data = await postAccounts(groupId, id);
    if (data.affectedRows === 1) {
      res.status(201).json({ success: true, message: 'Accounts was create successful' });
      return;
    }
    throw new Error('something went wrong posting accounts');
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
module.exports = { getAccount, postAccount };
