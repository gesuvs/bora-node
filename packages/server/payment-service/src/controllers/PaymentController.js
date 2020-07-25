import { logger } from "../logs";
import Wallet from "../models/Wallet";
import Statement from "../models/Statement";

export const addBalanceWallet = async (req, res) => {
  const { username } = req.params;
  const { addBalance } = req.body;

  if (!username) return res.sendStatus(400);
  let userExist = null;
  try {
    userExist = await Wallet.findOne({
      where: {
        username
      }
    });
  } catch (err) {
    logger.log({
      level: "error",
      message: err.message
    });
  }

  if (userExist && addBalance > 0) {
    await Wallet.update(
      {
        balance: userExist.balance + addBalance,
        username
      },
      {
        where: {
          id: userExist.id
        }
      }
    )
      .then(result => {
        if (!result) return res.sendStatus(400);
      })
      .catch(err => {
        res.json(err);
      });

    const balance = addBalance + userExist.balance;
    const oldBalance = userExist.balance;
    const { id } = userExist;

    await Statement.create({
      wallet: id,
      balance,
      balanceTransact: addBalance,
      transactType: "C",
      oldBalance
    })
      .then(() => {
        return res.sendStatus(200);
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
  } else {
    return res.sendStatus(400);
  }
};

export const removeBalanceWallet = async (req, res) => {
  const username = req.params.username;
  const Balance = req.body.addBalance;

  console.log(Balance);
  if (!username) return res.sendStatus(400);
  let userExist = null;
  try {
    userExist = await Wallet.findOne({
      where: {
        username
      }
    });
  } catch (err) {
    console.error(err);
  }

  if (userExist && Balance > 0 && userExist.balance > 0) {
    console.log("entrou");
    await Wallet.update(
      { balance: userExist.balance - Balance },
      { where: { id_wallet: userExist.id_wallet } }
    )
      .then(result => {
        if (!result) return res.sendStatus(400);
      })
      .catch(() => res.sendStatus(500));

    const { id_wallet } = userExist;
    const balance = userExist.balance - Balance;
    const balance_transact = Balance;
    const wallet_id = id_wallet;
    const oldBalance = userExist.balance;

    const step1 = await Statement.create({
      wallet_id,
      balance,
      balance_transact,
      transactType:"D",
      oldBalance
    })
      .then(() => {
        return res.sendStatus(200);
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
  } else {
    return res.sendStatus(400);
  }
};

export const paymentTransaction = async (req, res) => {
  const { guest, owner } = req.params;
  const { balanceTransact } = req.body;

  console.log(guest, owner);

  let userParticipant = null;
  let userOwner = null;

  if (!guest || !owner || !balanceTransact) return res.sendStatus(400);
  try {
    const username = guest;
    userParticipant = await Wallet.findOne({
      where: {
        username
      }
    });
  } catch (err) {}

  try {
    const username = owner;
    userOwner = await Wallet.findOne({
      where: {
        username
      }
    });
  } catch (err) {}

  if (!userParticipant || !userOwner) return res.sendStatus(400);
  if (
    balanceTransact > userParticipant.balance ||
    userParticipant.balance <= 0 ||
    balanceTransact < 0
  )
    return res.sendStatus(400);

  await Wallet.update(
    { balance: userParticipant.balance - balanceTransact },
    {
      where: {
        id: userParticipant.id
      }
    }
  )
    .then(result => {
      if (!result) return res.sendStatus(204);
    })
    .catch(err => {
      return res.sendStatus(500);
    });

  await Wallet.update(
    {
      balance: userOwner.balance + balanceTransact
    },
    {
      where: {
        id: userOwner.id
      }
    }
  )
    .then(result => {
      if (!result) return res.sendStatus(204);
    })
    .catch(() => res.sendStatus(500));

  try {
    const balance = userParticipant.balance - balanceTransact;
    const balance_transact = balanceTransact;
    const oldBalance = userParticipant.balance;

    await Statement.create({
      wallet: userParticipant.id,
      balance,
      balanceTransact,
      transactType: "D",
      oldBalance
    })
      .then(result => {
        if (!result) return res.sendStatus(500);
      })
      .catch(err => {
        logger.log({
          level: "error",
          message: "err.message"
        });
        res.status(400).send({
          data: {
            name: err.name,
            description: err.message
          }
        });
      });
  } catch (err) {}

  try {
    const balance = userOwner.balance + balanceTransact;
    const oldBalance = userOwner.balance;

    await Statement.create({
      wallet: userOwner.id,
      balance,
      balanceTransact,
      transactType: "C",
      oldBalance
    })
      .then(() => {
        return res.sendStatus(201);
      })
      .catch(err => {
        logger.log({
          level: "error",
          message: "err.message"
        });
        res.status(400).send({
          data: {
            name: err.name,
            description: err.message
          }
        });
      });
  } catch (err) {
    logger.log({
      level: "error",
      message: err.message
    });
  }
};
