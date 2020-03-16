import User from '../models/User';
import bcryptjs from 'bcryptjs';

export const create = async (req, res) => {
  const { name, username, email, password } = req.body;
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(password, salt, async (err, hash) => {
      await User.create({ name, username, email, password: hash })
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => res.send(err));
    });
  });
};

export const findAllUsers = async (req, res) => {
  await User.findAll()
    .then(result => {
      if (result === null) {
        return res.sendStatus(204);
      }
      res.json(result);
    })
    .catch(() => res.sendStatus(404));
};

export const findByUsername = async (req, res) => {
  const { username } = req.params;
  await User.findOne({
    where: {
      username,
    },
  })
    .then(result => {
      if (result === null) {
        return res.sendStatus(204);
      }
      res.json(result);
    })
    .catch(() => res.sendStatus(404));
};

// export const login = async (req, res) => {
//   const { username, password } = req.body;
//   User.authenticate = async (username, password) => {
//     const user = await User.findOne({
//       where: { username },
//     });
//   };
// };
