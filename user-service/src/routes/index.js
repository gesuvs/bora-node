import { Router } from 'express';
import {
  create,
  findAllUsers,
  findByUsername,
  login,
} from '../controllers/UserController';

export const routes = Router();

routes.post('/users', create);
routes.get('/users', findAllUsers);
routes.get('/users/:username', findByUsername);
routes.post('/auth', login);
