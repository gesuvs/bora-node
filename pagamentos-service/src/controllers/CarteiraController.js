import { logger } from '../logs';
import Carteira from '../models/Carteira';

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

  const { id_usuario, id_organizador, valor } = req.params;
  await Carteira.findOne({
    where: {
      id_usuario,
    },
  }).then(result => res.json(result));

  if (!result) return res.sendStatus(400);

  result.update({
    saldo: saldo - valor
  }).success(function () {})

  this.insertSaldoOwner(id_organizador, valor);
};

export const insertSaldoOwner = async () => {

  await Carteira.findOne({
    where: {
      id_organizador,
    },
  }).then(result => res.json(result));

  if (!result) return res.sendStatus(400);

  result.update({
    saldo: saldo + valor
  }).success(function () {})
};
