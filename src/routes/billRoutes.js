const express = require('express');
const { validateToken } = require('../middlewere');

const controller = require('../controllers/billsController');

const billsRoutes = express.Router();

billsRoutes.get('/bill/:groupId', validateToken, controller.getBill);
billsRoutes.post('/bill', validateToken, controller.postBill);
module.exports = billsRoutes;
