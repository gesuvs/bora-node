import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { privateKey } from '../config/signature';
import { logger } from '../logs';

export const create = async (req, res) => {
  console.log(req.body);
  const {
    user: { name, phone, username, mail, password },
  } = req.body;
  if (!username || !mail || !password) return res.sendStatus(400);

  await User.create({ name, phone, username, mail, password })
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

export const findAllUsers = async (req, res) => {
  await User.scope('withoutPassword')
    .findAll()
    .then(result => {
      if (!result.length) return res.sendStatus(204);
      res.json(result);
    })
    .catch(() => {
      console.log(res);
      res.sendStatus(500);
    });
  // .catch(() => res.sendStatus(500));
};

export const findUserByMail = async (req, res) => {
  const { mail } = req.params;
  await User.findOne({
    where: {
      mail,
    },
  }).then(result => res.json(result));
};

export const findByUsername = async (req, res) => {
  const { username } = req.params;
  await User.findOne({
    where: {
      username,
    },
  })
    .then(result => {
      if (!result) return res.sendStatus(204);
      res.json(result);
    })
    .catch(() => res.sendStatus(500));
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  await User.findOne({ where: { username } })
    .then(async result => {
      if (!result) return res.sendStatus(204);
      if (compareSync(password, result.password)) {
        const token = sign(
          { id: result.id, mail: result.mail },
          await privateKey(),
          {
            expiresIn: '10m',
            algorithm: 'RS256',
          }
        );
        res.status(200).send({ token });
      } else {
        res.sendStatus(401);
      }
    })
    .catch(() => res.sendStatus(500));
};
