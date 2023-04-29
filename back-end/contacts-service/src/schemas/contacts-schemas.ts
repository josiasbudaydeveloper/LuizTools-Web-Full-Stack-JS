import Joi from 'joi';

const contactCreationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .pattern(/^\d{11,13}$/),
  status: Joi.number()
    .integer()
    .min(100)
    .max(400)
});

const contactUpdateSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255),
  phone: Joi.string()
    .pattern(/^\d{11,13}$/),
  status: Joi.number()
    .integer()
    .min(100)
    .max(400)
});

export {
  contactCreationSchema,
  contactUpdateSchema
}