import { Response } from 'express';

function getToken(res: Response) {
  const payload = res.locals.payload;

  if (!payload || !payload.accountId) return res.sendStatus(401);

  return payload;
}

export default {
  getToken
}