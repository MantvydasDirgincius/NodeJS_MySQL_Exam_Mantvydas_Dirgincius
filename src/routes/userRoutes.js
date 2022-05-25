const express = require('express');
const bcrypt = require('bcryptjs');

const { validateUser } = require('../middlewere');
const { addUserToDb } = require('../model/userModel');

const userRoutes = express.Router();

userRoutes.post('/registration', validateUser, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      full_name: name,
    };

    await addUserToDb(newUser.email, newUser.password, newUser.full_name);

    res.status(201).json({ success: true, msg: 'user created' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});
module.exports = userRoutes;
