import { Router } from 'express';
import {
  create,
  findAllUsers,
  findByUsername,
  findUserByMail,
  login,
} from '../controllers/UserController';
import { validateToken } from '../middleware/verifyToken';

export const routes = Router();

routes.post('/users', create);
routes.get('/users', findAllUsers);
routes.get('/users/:username', findByUsername);
routes.get('/users/mail/:mail', validateToken, findUserByMail);
routes.post('/auth', login);
