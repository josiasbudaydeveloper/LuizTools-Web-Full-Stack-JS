import { Request, Response, NextFunction } from "express";
import { accountCreationSchema, accountUpdateSchema, accountLoginSchema } from "../schemas/accounts-schemas";
import Joi from "joi";
import auth from "../auth";

function validateIdFormat(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
	  if (!id) throw new Error('id is in invalid format');

    next();
  }
  catch(error) {
    console.log(error);
    res.sendStatus(400);
  }
}

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: NextFunction) {
  const { error } = schema.validate(req.body);
  if (error == null) return next();

  const { details } = error;
  const message = details.map(item => item.message).join(',');

  console.log(message);
  res.sendStatus(422);
}

function validateAddAccountSchema(req: Request, res: Response, next: NextFunction) {
  return validateSchema(accountCreationSchema, req, res, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: NextFunction) {
  return validateSchema(accountUpdateSchema, req, res, next);
}

function validateAccountLoginSchema(req: Request, res: Response, next: NextFunction) {
  return validateSchema(accountLoginSchema, req, res, next);
}

async function validateAuthToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers['authorization'] as string;
    if (!token) return res.sendStatus(401);

    const payload = await auth.verifyToken(token);
    if (!payload) return res.sendStatus(401);

    res.locals.payload = payload;
    return next();
  }
  catch(error) {
    console.log(error);
    res.sendStatus(401);
  }
}

export {
  validateIdFormat,
  validateAddAccountSchema,
  validateUpdateAccountSchema,
  validateAccountLoginSchema,
  validateAuthToken
}