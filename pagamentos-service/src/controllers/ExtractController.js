import { logger } from '../logs';
import Extract from '../models/Extract';

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




