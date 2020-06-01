import { Router } from 'express';
import {
  create,
  updateSaldo,
} from '../controllers/CarteiraController';

import {
  InsertHistorico
} from '../controllers/ExtratoController';

export const routes = Router();

routes.post('/pagamentos', create);
routes.put('/pagamentos', updateSaldo);

routes.post('/pagamentos', InsertHistorico);


