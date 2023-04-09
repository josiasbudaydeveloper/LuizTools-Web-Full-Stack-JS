import { Request, Response, NextFunction } from "express";
import { accountCreationSchema, accountUpdateSchema, accountLoginSchema } from "../schemas/accounts-schemas";
import Joi from "joi";

function validateId(req: Request, res: Response, next: NextFunction) {
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

function validateAddAccount(req: Request, res: Response, next: NextFunction) {
  return validateSchema(accountCreationSchema, req, res, next);
}

function validateUpdateAccount(req: Request, res: Response, next: NextFunction) {
  return validateSchema(accountUpdateSchema, req, res, next);
}

function validateAccountLogin(req: Request, res: Response, next: NextFunction) {
  return validateSchema(accountLoginSchema, req, res, next);
}

export {
  validateId,
  validateAddAccount,
  validateUpdateAccount,
  validateAccountLogin
}