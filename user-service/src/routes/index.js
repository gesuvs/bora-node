import { Router } from 'express';
export const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    msg: 'Hello World',
  });
});
