import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export type Token = {
  accountId: number;
}

const publicKey = fs.readFileSync(path.resolve(__dirname, '../', 'keys/public.key'), 'utf-8');

async function verifyToken(token : string) {
  try {
    const decoded = await jwt.verify(token, publicKey, {
      algorithms: ["RS256"]
    }) as Token;

    return { accountId: decoded.accountId }
  }
  catch(error) {
    console.log(error);
    return null;
  }
}

export default {
  verifyToken
}