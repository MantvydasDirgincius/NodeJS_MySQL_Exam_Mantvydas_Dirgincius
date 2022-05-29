const express = require('express');
const { validateToken } = require('../middlewere');

const controller = require('../controllers/groupController');

const groupRoutes = express.Router();

groupRoutes.get('/groups', validateToken, controller.getGroups);

groupRoutes.post('/groups', validateToken, controller.postGroups);
module.exports = groupRoutes;
