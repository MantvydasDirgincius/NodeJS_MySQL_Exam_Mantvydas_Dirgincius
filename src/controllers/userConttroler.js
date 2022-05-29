const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { addUserToDb, findUserByEmail } = require('../model/userModel');

const registration = async (req, res) => {
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
};
const login = async (req, res) => {
  const { email, password } = req.body;

  const [foundUser] = await findUserByEmail(email);

  if (!foundUser) {
    res.status(400).json({ success: false, msg: 'email or password not found' });
    return;
  }
  if (!bcrypt.compareSync(password, foundUser.password)) {
    res.status(400).json({ success: false, msg: 'email or password not found' });
    return;
  }
  const paylod = { userId: foundUser.id };
  const token = jwt.sign(paylod, jwtSecret, { expiresIn: '1h' });
  // eslint-disable-next-line object-curly-newline
  res.json({ success: true, msg: 'login success', token, paylod });
};
module.exports = { registration, login };
