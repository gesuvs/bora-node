import { logger } from '../logs';
import Extract from '../models/Extract';

export const createExtract = async (req, res) => {

  const wallet_id = req.params.idWallet;
  const balance = req.body.balance;
  console.log(wallet_id);
  if (!wallet_id || !balance) return res.sendStatus(400);

  await Extract.create({ wallet_id , balance})
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



export const findAllExtractbyWallet = async (req, res) => {

  const wallet_id = req.params.idWallet;
  const page = req.params.page || 1;
  const limit = 5;

  console.log(wallet_id , page);
  if (!wallet_id) return res.sendStatus(400);
  
  await Extract.findAll({
      where: {
        wallet_id,
      },
      order: [
        ['id_extract', 'DESC']
      ],
      offset: ((page - 1) * limit),
      limit: limit
    }).then(result => {
      if (!result) return res.sendStatus(204);
      res.json(result);
      })
      .catch(() => res.sendStatus(500)
      );

};




