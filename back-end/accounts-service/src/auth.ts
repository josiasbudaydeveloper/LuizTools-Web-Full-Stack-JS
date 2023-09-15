import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// From root to keys/
const privateKey = fs.readFileSync(path.resolve(__dirname, 'keys/private.key'), 'utf-8');
const JWT_EXPIRES = parseInt(process.env.JWT_EXPIRES!) || 1800;
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

export default {
  hashPassword,
  comparePassword,
  signToken
}