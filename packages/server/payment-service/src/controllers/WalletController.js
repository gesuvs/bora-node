import { logger } from "../logs";
import Wallet from "../models/Wallet";

export const createWallet = async (req, res) => {
  const { username } = req.params;

  if (!username) return res.sendStatus(400);
  let userExist = null;
  try {
    userExist = await Wallet.findOne({
      where: {
        username
      }
    });
  } catch (err) {
    console.log(err);
  }

  if (userExist) {
    return res.sendStatus(400);
  } else {
    await Wallet.create({ username })
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
  }
};

export const findWallet = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.sendStatus(400);

  await Wallet.findOne({
    where: {
      username
    }
  })
    .then(result => {
      if (!result) return res.sendStatus(204);
      res.json(result);
    })
    .catch(() => res.sendStatus(500));
};
