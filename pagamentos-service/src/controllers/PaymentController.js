import { logger } from '../logs';
import Wallet from '../models/Wallet';
import Extract from '../models/Extract';
import { Router } from 'express';


export const paymentTransaction = async (req, res) => {

    const {idUserParticipantEvent , idUserOwnerEvent} = req.params;
    const {balanceTransact} = req.body;

    console.log(idUserParticipantEvent , idUserOwnerEvent);
    if (!idUserParticipantEvent || !idUserOwnerEvent || !balanceTransact) return res.sendStatus(400);

    let id_user = idUserParticipantEvent;

    await Wallet.findOne({
        where: {
          id_user,
        },
    }).then(result => {
        if (!result) return res.sendStatus(204);
            let {balance , id_wallet} = result;
            if(balanceTransact > balance || balance < 0) return res.sendStatus(204);
            export const userParticipant = {
                id_wallet: id_wallet,
                balance: balance
            }
        })
    .catch(() => res.sendStatus(500));

    id_user = idUserOwnerEvent;

    await Wallet.findOne({
        where: {
          id_user,
        },
    }).then(result => {
        if (!result) return res.sendStatus(204);
            let {balance , id_wallet} = result;
            export const userOwner = {
                id_wallet: id_wallet,
                balance: balance
            }
            
    })
    .catch(() => res.sendStatus(500));

    await Wallet.update(
        { balance: (userParticipant.balance - balanceTransact) },
        { where: { id_wallet: userParticipant.id_wallet } }
    ).then(result => {
        if (!result) return res.sendStatus(204);
    }).catch(() => res.sendStatus(500));   

    await Wallet.update(
        { balance: (userOwner.balance + balanceTransact) },
        { where: { id_wallet: userOwner.id_wallet } }
    ).then(result => {
        if (!result) return res.sendStatus(204);
    }).catch(() => res.sendStatus(500));

    let wallet_id = userParticipant.id_wallet;
    let balance = userParticipant.balance;
    await Extract.create({ wallet_id , balance})
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

    console.log(userOwner);
    console.log(userParticipant);
    
    wallet_id = userOwner.id_wallet;
    balance = userOwner.balance;
    await Extract.create({ wallet_id , balance})
    .then(() => {
      res.sendStatus(200);
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