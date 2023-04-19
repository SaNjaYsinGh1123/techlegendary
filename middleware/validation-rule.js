const { check } = require('express-validator');
exports.form=[
  // first Name validation
  check('question').trim().notEmpty().withMessage('question required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
 // last Name validation
  check('options').notEmpty().isArray().withMessage('options array required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
  // email address validation
  check('rightAnswer').notEmpty().withMessage('rightAnswer index required').matches(/(?=.*?[0-9])/).withMessage('must be number'),
  // password validation
  check('startDate').trim().notEmpty().withMessage('startDate required')
  .isISO8601().toDate()
  .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss'),
 
  check('endDate').trim().notEmpty().withMessage('startDate required')
  .isISO8601().toDate()
  .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss')

]