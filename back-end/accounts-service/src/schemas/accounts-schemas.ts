import Joi from 'joi';

const accountCreationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .max(255)
    .required(),
  status: Joi.number()
    .integer()
    .min(100)
    .max(400),
  domain: Joi.string()
    .min(7)
    .max(255)
});

const accountUpdateSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255),
  password: Joi.string()
    .alphanum()
    .min(8)
    .max(255),
  status: Joi.number()
    .integer()
    .min(100)
    .max(400),
  domain: Joi.string()
    .min(7)
    .max(255)
});

const accountLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .alphanum()
    .max(255)
    .required()  
});

export {
  accountCreationSchema,
  accountUpdateSchema,
  accountLoginSchema
}