import { Router } from 'express';
import {
  createWallet,
  findWallet,
} from '../controllers/WalletController';

import {
  findAllExtractbyWallet , createExtract
} from '../controllers/ExtractController';

import {
  paymentTransaction
} from '../controllers/PaymentController';

export const routes = Router();

routes.post('/:idUser/createWallet', createWallet);
routes.get('/:idUser/findWallet', findWallet);

routes.post('/:idWallet/createRegisterExtract', createExtract);
routes.get('/:idWallet/findAllExtractbyWallet/:page', findAllExtractbyWallet);

routes.put('/:idUserParticipantEvent/:idUserOwnerEvent/PaymentTransaction', paymentTransaction);





