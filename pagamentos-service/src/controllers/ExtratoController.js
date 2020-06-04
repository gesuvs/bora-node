import { logger } from '../logs';
import Extrato from '../models/Extrato';

export const InsertHistorico = async (req, res) => {

   const { id_usuario, valor } = req.body;
   await Extrato.create({ id_usuario, valor })
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


export const GetHistorico = async (req, res) => {

    const {id_usuario} = req.body;

    await Extrato.findAll({
        where: {
            id_usuario,
        },
    })
    .then(result => {
          if (!result) return res.sendStatus(204);
          res.json(result);
    })
    .catch(() => res.sendStatus(500));

};
