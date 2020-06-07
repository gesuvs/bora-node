import { Router } from 'express';
import {
  create,
  updateSaldo,
} from '../controllers/CarteiraController';

import {
  InsertHistorico, GetHistorico
} from '../controllers/ExtratoController';

export const routes = Router();

routes.post('/pagamentos/criarCarteira', create);
routes.put('/pagamentos/atualizarSaldo', updateSaldo);

routes.post('/pagamentos/inserirHistorico', InsertHistorico);
routes.get('/pagamentos/visualizarExtrato', GetHistorico);



