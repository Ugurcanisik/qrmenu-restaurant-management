import * as Joi from 'joi';

export default Joi.object().keys({
  name: Joi.string()
    .required()
    .min(1)
    .max(50)
    .rule({ message: 'name must be between 1 and 11' }),
  price: Joi.string()
    .required()
    .min(1)
    .max(20)
    .rule({ message: 'price must be between 1 and 11' }),
  id: Joi.string().required(),
});
