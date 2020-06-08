import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { privateKey } from '../config/signature';
import { logger } from '../logs';
import bcryptjs from 'bcryptjs';

const strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15}$)'
);

export const create = async (req, res) => {
  const {
    user: { name, phone, username, mail, password },
  } = req.body;
  if (!username || !mail || !password) return res.sendStatus(400);

  await User.create({ name, phone, username, mail, password })
    .then(result => {
      if (result) return res.sendStatus(201);
      else return res.sendStatus(400);
    })
    .catch(err => {
      logger.log({
        level: 'error',
        message: err.message,
      });
      res.status(500).send({
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
      return res.json(result);
    })
    .catch(err => {
      return res.sendStatus(500);
    });
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
  const {
    user: { username, password },
  } = req.body;

  await User.findOne({ where: { username } })
    .then(async result => {
      if (!result) return res.sendStatus(204);
      if (compareSync(password, result.password)) {
        const token = sign(
          { id: result.id, mail: result.mail },
          await privateKey(),
          {
            expiresIn: '60m',
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

export const alterUser = async (req, res) => {
  const { username } = req.params;
  const { user } = req.body;

  const oldUser = await User.findOne({ where: { username } });

  if (!oldUser) {
    return res.sendStatus(204);
  }

  const { mail } = req.body.user;

  if (mail) {
    await User.findOne({ where: { mail } }).thenReturn(() => {
      return res.status(400).send({ msg: 'Mail already exists' });
    });
  }

  if (user.password) {
    if (strongRegex.test(user.password)) {
      await bcryptjs
        .hash(user.password, 10)
        .then(hash => {
          user.password = hash;
        })
        .catch(err => {
          throw new Error();
        });
    } else {
      return res.status(400).send({ error: 'password invalid' });
    }
  }

  (await oldUser?.update(user))
    .save()
    .then(result => {
      if (result) return res.sendStatus(200);
    })
    .catch(() => res.sendStatus(400));
};
