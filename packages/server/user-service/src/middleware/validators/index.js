import { body, validationResult } from 'express-validator';

export const userValidationRules = () => [
  body('user.mail').isEmail(),
  body('user.password').isLength({ min: 8, max: 15 }),
  body('user.name').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
  body('user.phone').isMobilePhone('pt-BR'),
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

  console.log(req.body);

  return res.status(405).json({
    errors: extractedErrors,
  });
};
