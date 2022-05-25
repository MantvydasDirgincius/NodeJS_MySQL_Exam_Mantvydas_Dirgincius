const Joi = require('joi');

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
    console.log('validuojant erroras ===', error);
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
    console.log('validuojant erroras ===', error);
    res.status(400).json({ success: false, error: error.details });
  }
}

module.exports = {
  validateUserRegistracion,
  validateUserLogin,
};
