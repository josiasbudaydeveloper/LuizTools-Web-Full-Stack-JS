import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import auth from '../auth';
import { Console } from 'console';

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

async function validateAuthentication(req: Request, res: Response, next: NextFunction) {
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

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: NextFunction) {
  const { error } = schema.validate(req.body);
  if (error == null) return next();

  const { details } = error;
  const message = details.map(item => item.message).join(',');

  console.log(message);
  res.sendStatus(422);
}

export default {
  validateIdFormat,
  validateAuthentication,
  validateSchema
}