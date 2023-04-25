import { Request, Response, NextFunction } from "express";
import { accountCreationSchema, accountUpdateSchema, accountLoginSchema } from "../schemas/accounts-schemas";
import Joi from "joi";
import commonsMiddlewares from 'ms-commons/api/middlewares/commons-middlewares';
import commonsControllers from 'ms-commons/api/controllers/commons-controllers';
import { Token } from "ms-commons/api/auth";

function validateIdFormat(req: Request, res: Response, next: NextFunction) {
  return commonsMiddlewares.validateIdFormat(req, res, next);
}

function validateAuthentication(req: Request, res: Response, next: NextFunction) {
  return commonsMiddlewares.validateAuthentication(req, res, next);
}

function validateAuthorization(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const token = commonsControllers.getToken(res) as Token;
    if (id !== token.accountId) return res.sendStatus(403);

    next();
  }
  catch(error) {
    console.log(error);
    res.sendStatus(400);
  }
}

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: NextFunction) {
  return commonsMiddlewares.validateSchema(schema, req, res, next);
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

export default {
  validateIdFormat,
  validateAuthentication,
  validateAuthorization,
  validateAddAccountSchema,
  validateUpdateAccountSchema,
  validateAccountLoginSchema
}