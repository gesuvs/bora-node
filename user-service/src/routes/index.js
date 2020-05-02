import { Router } from 'express';
import {
  create,
  findAllUsers,
  findByUsername,
  findUserByMail,
  login,
} from '../controllers/UserController';
import { validateToken } from '../middleware/verifyToken';

import { userValidationRules, validate } from '../middleware/validators';

export const routes = Router();

routes.post('/users', userValidationRules(), validate, create);
routes.get('/users', validateToken, findAllUsers);
routes.get('/users/:username', validateToken, findByUsername);
routes.get('/users/mail/:mail', validateToken, findUserByMail);
routes.post('/auth', login);
