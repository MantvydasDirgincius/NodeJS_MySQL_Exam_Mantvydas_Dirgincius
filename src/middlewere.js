const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./config');

async function validateUserRegistracion(req, res, next) {
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().email().trim().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(10).required(),
    // eslint-disable-next-line newline-per-chained-call
    name: Joi.string().trim().min(5).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    // console.log('validuojant erroras ===', error);
    res.status(400).json({ success: false, error: error.details });
  }
}
async function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().email().trim().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    // console.log('validuojant erroras ===', error);
    res.status(400).json({ success: false, error: error.details });
  }
}
async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];

  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,

      error: 'No valid token',
    });

    return;
  }

  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const { userId } = tokenPayload;
    req.userId = userId;
    next();
  } catch (error) {
    // token not valid

    res.status(403).json({
      success: false,

      error: 'Invalid token',
    });
  }
}

module.exports = {
  validateUserRegistracion,
  validateUserLogin,
  validateToken,
};
