const { getBills, postBills } = require('../model/billsModel');

const getBill = async (req, res) => {
  try {
    const { groupId } = req.params;

    const data = await getBills(groupId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};
const postBill = async (req, res) => {
  try {
    const { groupId, amount, description } = req.body;
    const data = await postBills(groupId, amount, description);
    if (data.affectedRows === 1) {
      res.status(201).json({ success: true, message: 'Bill was create successful' });
      return;
    }
    throw new Error('something went wrong posting bill');
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = { getBill, postBill };
