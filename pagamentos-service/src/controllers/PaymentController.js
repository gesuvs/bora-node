import { logger } from '../logs';
import Wallet from '../models/Wallet';
import Extract from '../models/Extract';
import { Router } from 'express';

export const addBalanceWallet = async (req, res) => {
  const username = req.params.username
  const BalanceTransact = req.body.addBalance
  
  console.log(BalanceTransact)
  if (!username) return res.sendStatus(400);
  let userExist = null;
  try{
    userExist = await Wallet.findOne({
      where: {
        username,
      },
    })
  }catch(err){}

  if(userExist && BalanceTransact > 0){
    await Wallet.update(
      { balance: userExist.balance + BalanceTransact},
      { where: { id_wallet: userExist.id_wallet } }
    ).then(result => {
        if (!result) return res.sendStatus(400);
    }).catch(() => res.sendStatus(500)); 

    let {id_wallet} = userExist;
    let balance = (BalanceTransact + userExist.balance);
    let balance_transact = BalanceTransact;
    let transact_type = 'C';
    let wallet_id = id_wallet;
    let oldBalance = userExist.balance;
    

    const step1 = await Extract.create({ wallet_id , balance ,balance_transact,transact_type ,oldBalance })
    .then(() => {
      return res.sendStatus(200);
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
  }else{
    return res.sendStatus(400)
  }


}


export const removeBalanceWallet = async (req, res) => {
  const username = req.params.username
  const Balance = req.body.addBalance
  
  console.log(Balance)
  if (!username) return res.sendStatus(400);
  let userExist = null;
  try{
    userExist = await Wallet.findOne({
      where: {
        username,
      },
    })
  }catch(err){}


  if((userExist && Balance > 0) && (userExist.balance > 0 )){
    await Wallet.update(
      { balance: userExist.balance - Balance},
      { where: { id_wallet: userExist.id_wallet } }
    ).then(result => {
        if (!result) return res.sendStatus(400);
    }).catch(() => res.sendStatus(500)); 

    let {id_wallet} = userExist;
    let balance = (userExist.balance - Balance);
    let balance_transact = Balance;
    let transact_type = 'D';
    let wallet_id = id_wallet;
    let oldBalance = userExist.balance;
    

    const step1 = await Extract.create({ wallet_id , balance ,balance_transact,transact_type , oldBalance})
    .then(() => {
      return res.sendStatus(200);
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
  }else{
    return res.sendStatus(400)
  }


}





export const paymentTransaction = async (req, res) => {

    const {idUserParticipantEvent , idUserOwnerEvent} = req.params;
    const {balanceTransact} = req.body;

    console.log(idUserParticipantEvent , idUserOwnerEvent);
    
    let userParticipant = null;
    let userOwner = null;

    if (!idUserParticipantEvent || !idUserOwnerEvent || !balanceTransact) return res.sendStatus(400);
    try{
      let username = idUserParticipantEvent;
      userParticipant = await Wallet.findOne({
        where: {
          username,
        },
      })
    }catch(err){}

    try{
      let username = idUserOwnerEvent;
      userOwner = await Wallet.findOne({
        where: {
          username,
        },
      })
    }catch(err){}

    if (!userParticipant || !userOwner ) return res.sendStatus(400);
    if((balanceTransact > userParticipant.balance) || (userParticipant.balance <= 0) || (balanceTransact < 0) ) return res.sendStatus(400);

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

    try{
      let wallet_id = userParticipant.id_wallet;
      let balance = (userParticipant.balance - balanceTransact);
      let balance_transact = balanceTransact;
      let oldBalance = userParticipant.balance;
      let transact_type = 'D';

      await Extract.create({ wallet_id , balance ,balance_transact,transact_type , oldBalance})
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
    }catch(err){}

    try{
      let wallet_id = userOwner.id_wallet;
      let balance = (userOwner.balance + balanceTransact);
      let balance_transact = balanceTransact;
      let oldBalance = userOwner.balance;
      let transact_type = 'C';

      await Extract.create({ wallet_id , balance ,balance_transact,transact_type , oldBalance})
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
    }catch(err){}



};