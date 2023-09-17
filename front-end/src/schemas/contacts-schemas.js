import Joi from 'joi';

const contactCreationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .required(),
  phone: Joi.string()
    .length(21)
    .allow(null, '')
    .optional(),
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
    .min(21)
    .max(21),
  status: Joi.number()
    .integer()
    .min(100)
    .max(400)
});

export {
  contactCreationSchema,
  contactUpdateSchema
}