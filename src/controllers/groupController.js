const { getGoups, postGoups } = require('../model/groupModel');

const getGroups = async (req, res) => {
  try {
    const data = await getGoups();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};
const postGroups = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await postGoups(name);
    if (data.affectedRows === 1) {
      res.status(201).json({ success: true, message: 'Group was create successful' });
      return;
    }
    throw new Error('something went wrong posting group');
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = { getGroups, postGroups };
