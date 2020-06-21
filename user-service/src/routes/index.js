import { Router } from 'express';

import * as user from '../controllers';

import { validateToken, userValidationRules, validate } from '../middleware';

export const routes = Router();

routes.post('/auth', user.login);
routes.post('/', userValidationRules(), validate, user.create);

routes.use(validateToken);
routes.get('/', user.findAllUsers);
routes.get('/:username', user.findByUsername);
routes.get('/mail/:mail', user.findUserByMail);
routes.patch('/:username', user.alterUser);
