import { Router } from 'express';
import {
  create,
  updateSaldo,
} from '../controllers/CarteiraController';

export const routes = Router();

routes.post('/pagamentos', create);
routes.post('/pagamentos', updateSaldo);
