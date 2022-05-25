const express = require('express');
const { validateToken } = require('../middlewere');
const { getGoups } = require('../model/groupModel');

const groupRoutes = express.Router();

groupRoutes.get('/groups', validateToken, async (req, res) => {
  try {
    const data = await getGoups();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

module.exports = groupRoutes;
