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

routes.post('/', userValidationRules(), validate, create);
// routes.get('/', validateToken, findAllUsers);
routes.get('/', findAllUsers);
routes.get('/:username', validateToken, findByUsername);
routes.get('/mail/:mail', validateToken, findUserByMail);
routes.post('/auth', login);
