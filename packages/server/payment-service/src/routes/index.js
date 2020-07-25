import { Router } from "express";

import {
  addBalanceWallet,
  createStatement,
  createWallet,
  findAllStatementbyWallet,
  findWallet,
  paymentTransaction,
  removeBalanceWallet
} from "../controllers";

export const routes = Router();

routes.post("/:username/create-wallet", createWallet);
routes.get("/:username/find-wallet", findWallet);

routes.post("/:wallet/create-register-extract", createStatement);
routes.get("/:id/statement-by-wallet/:page", findAllStatementbyWallet);

routes.patch("/:guest/:owner/payment-transaction", paymentTransaction);
routes.put("/:username/add-balance-wallet", addBalanceWallet);
routes.put("/:username/remove-balance-wallet", removeBalanceWallet);
