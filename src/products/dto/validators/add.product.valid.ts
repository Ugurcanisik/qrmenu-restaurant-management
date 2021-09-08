import * as Joi from 'joi'

export default Joi.object().keys({
    name:  Joi.string().required().min(1).max(60).rule({ message: 'name must be between 1 and 11' }),
    description:  Joi.string().allow('').min(1).max(500).rule({ message: 'Açıklama must be between 1 and 22' }),
    price:  Joi.string().allow('').min(1).max(15).rule({ message: 'Fiyat must be between 1 and 33' }),
    categoryid: Joi.string().required()
})