const { body } = require('express-validator');
module.exports = {
  registerValidator: [
    body('name')
      .isLength(1)
      .withMessage('You must provide at least 1 characters for your name!'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('You must provide valid email!')
      .normalizeEmail()
      .toLowerCase(),
    body('password')
      .trim()
      .isLength(5)
      .withMessage('You must contain at least 5 characters!'),
    body('address')
      .trim()
      .isLength(2)
      .withMessage('The address must contain at least 2 characters')
  ],
}
