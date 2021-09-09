import * as Joi from 'joi';

export default Joi.object().keys({
  name: Joi.string()
    .required()
    .min(1)
    .max(100)
    .rule({ message: 'Name must be between 1 and 400' }),
  description: Joi.string()
    .allow('')
    .min(1)
    .max(500)
    .rule({ message: 'Açıklama must be between 1 and 400' }),
  price: Joi.string()
    .allow('')
    .min(1)
    .max(5)
    .rule({ message: 'Fiyat must be between 1 and 400' }),
  categoryid: Joi.string().required(),
  id: Joi.string().required(),
});
