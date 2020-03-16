import { Router } from 'express';
import {
  create,
  findAllUsers,
  findByUsername,
} from '../controllers/UserController';

export const routes = Router();

routes.post('/users', create);
routes.get('/users', findAllUsers);
routes.get('/users/:username', findByUsername);
