import { verify } from 'jsonwebtoken';
import { publicKey } from '../config/signature';

export const validateToken = async (req, res, next) => {
  verify(
    req.headers['x-access-token'],
    await publicKey(),
    { algorithm: ['RS256'] },
    err => {
      if (err) {
        res
          .status(401)
          .send({ status: 'error', message: err.message, data: null });
      } else {
        next();
      }
    }
  );
};
