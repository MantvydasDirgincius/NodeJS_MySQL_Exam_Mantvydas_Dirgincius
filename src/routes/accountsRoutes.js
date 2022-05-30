const express = require('express');
const { validateToken } = require('../middlewere');

const controller = require('../controllers/accountsController');

const accountsRoutes = express.Router();

accountsRoutes.get('/accounts', validateToken, controller.getAccount);
accountsRoutes.post('/accounts', validateToken, controller.postAccount);

module.exports = accountsRoutes;
