import { logger } from '../logs';
import Wallet from '../models/Wallet';

export const createWallet = async (req, res) => {

  const {
    wallet: { balance }
  } = req.body;

  const id_user = req.params.idUser
  console.log(id_user)
  if (!id_user || balance < 0) return res.sendStatus(400);

  await Wallet.create({ id_user, balance })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      logger.log({
        level: 'error',
        message: err.message,
      });
      res.status(400).send({
        data: {
          name: err.name,
          description: err.message,
        },
      });
    });
};

export const findWallet = async (req, res) => {

  const id_user = req.params.idUser
  console.log(id_user)
  if (!id_user ) return res.sendStatus(400);
    await Wallet.findOne({
      where: {
        id_user,
      },
    }).then(result => {
      if (!result) return res.sendStatus(204);
      res.json(result);
      })
      .catch(() => res.sendStatus(500));
};