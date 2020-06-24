import { Response, Request } from 'express';

export const healthcheck = (req: Request, res: Response): Response<string> => {
  return res.json({
    healthcheck: 'ok',
  });
};
