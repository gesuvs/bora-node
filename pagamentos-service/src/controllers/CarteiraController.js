import { logger } from '../logs';
import Carteira from '../models/Carteira';
import User from '../models/User';

export const create = async (req, res) => {

  console.log(req.body);

  const {
    carteira: { idUsuario, saldo }
  } = req.body;

  if (!idUsuario || !saldo ) return res.sendStatus(400);

  await Carteira.create({ idUsuario, saldo })
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

export const updateSaldo = async (req, res) => {

  const { id_usuario } = req.params;
  await Carteira.findOne({
    where: {
      id_usuario,
    },
  }).then(result => res.json(result));

  if (!result) return res.sendStatus(400);

  result.update({
    saldo: req.params
  }).success(function () {})

  this.insertSaldoOwner();
};

  export const insertSaldoOwner = async () => {

  };
