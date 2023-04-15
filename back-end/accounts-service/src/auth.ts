import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

// From root to keys/
const privateKey = fs.readFileSync('./keys/private.key');
const publicKey = fs.readFileSync('./keys/public.key');
const JWT_EXPIRES = parseInt(process.env.JWT_EXPIRES!);
const algorithm = "RS256";

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}

type Token = {
  accountId: number;
}

function signToken(accountId: number) {
  const token : Token = { accountId }

  return jwt.sign(token, privateKey, {
    expiresIn: JWT_EXPIRES,
    algorithm
  });
}

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
  hashPassword,
  comparePassword,
  signToken,
  verifyToken
}