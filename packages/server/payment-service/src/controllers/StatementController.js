import { logger } from "../logs";
import Statement from "../models/Statement";

export const createStatement = async (req, res) => {
  const wallet_id = req.params.idWallet;
  const balance = req.body.balance;
  console.log(wallet_id);
  if (!wallet_id || !balance) return res.sendStatus(400);

  await Statement.create({ wallet_id, balance })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      logger.log({
        level: "error",
        message: err.message
      });
      res.status(400).send({
        data: {
          name: err.name,
          description: err.message
        }
      });
    });
};

export const findAllStatementbyWallet = async (req, res) => {
  const { id, page } = req.params;
  const limit = 5;

  if (!id) return res.sendStatus(400);

  await Statement.findAll({
    where: {
      wallet: id
    },
    order: [["created_at", "DESC"]],
    offset: page * limit,
    limit
  })
    .then(result => {
      if (!result) return res.sendStatus(204);
      res.json(result);
    })
    .catch(() => res.sendStatus(500));
};
