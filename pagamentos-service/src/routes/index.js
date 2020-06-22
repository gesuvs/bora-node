import { Router } from 'express';
import {
  createWallet,
  findWallet,
} from '../controllers/WalletController';

import {
  findAllExtractbyWallet , createExtract
} from '../controllers/ExtractController';

import {
  paymentTransaction , addBalanceWallet , removeBalanceWallet
} from '../controllers/PaymentController';

export const routes = Router();

routes.post('/:username/createWallet', createWallet);
routes.get('/:username/findWallet', findWallet);

routes.post('/:idWallet/createRegisterExtract', createExtract);
routes.get('/:idWallet/findAllExtractbyWallet/:page', findAllExtractbyWallet);

routes.put('/:idUserParticipantEvent/:idUserOwnerEvent/PaymentTransaction', paymentTransaction);
routes.put('/:username/addBalanceWallet', addBalanceWallet);
routes.put('/:username/removeBalanceWallet', removeBalanceWallet)





