import { Router } from 'express';
import {
  create,
  findAllUsers,
  findByUsername,
  findUserByMail,
  login,
} from '../controllers/UserController';
import { validateToken } from '../middleware/verifyToken';

import { userValidationRules, validate } from '../validators';

export const routes = Router();

routes.post('/users', userValidationRules(), validate, create);
routes.get('/users', findAllUsers);
routes.get('/users/:username', findByUsername);
routes.get('/users/mail/:mail', validateToken, findUserByMail);
routes.post('/auth', login);
