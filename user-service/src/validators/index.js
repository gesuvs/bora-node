import { body, validationResult } from 'express-validator';

export const userValidationRules = () => [
  body('mail').isEmail(),
  body('password').isLength({ min: 8, max: 15 }),
  body('name').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
  body('phone').isMobilePhone('pt-BR'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];

  errors.array().map(err =>
    extractedErrors.push({
      [err.param]: err.msg,
    })
  );
  return res.status(422).json({
    errors: extractedErrors,
  });
};
