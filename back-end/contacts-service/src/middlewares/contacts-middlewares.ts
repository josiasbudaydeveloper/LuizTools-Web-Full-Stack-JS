import { Request, Response, NextFunction } from "express";
import { contactCreationSchema, contactUpdateSchema } from "../schemas/contacts-schemas";
import Joi from "joi";
import commonsMiddlewares from 'ms-commons/api/middlewares/commons-middlewares';

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: NextFunction) {
  return commonsMiddlewares.validateSchema(schema, req, res, next);
}

function validateAddContactSchema(req: Request, res: Response, next: NextFunction) {
  return validateSchema(contactCreationSchema, req, res, next);
}

function validateUpdateContactSchema(req: Request, res: Response, next: NextFunction) {
  return validateSchema(contactUpdateSchema, req, res, next);
}

export default {
  validateAddContactSchema,
  validateUpdateContactSchema
}