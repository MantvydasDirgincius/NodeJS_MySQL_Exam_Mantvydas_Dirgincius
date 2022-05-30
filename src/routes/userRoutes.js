const express = require('express');

const controller = require('../controllers/userConttroler');

const { validateUserRegistracion, validateUserLogin } = require('../middlewere');

const userRoutes = express.Router();

userRoutes.post('/registration', validateUserRegistracion, controller.registration);

userRoutes.post('/login', validateUserLogin, controller.login);
module.exports = userRoutes;
