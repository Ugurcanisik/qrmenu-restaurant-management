import * as Joi from 'joi'

export default Joi.object().keys({
    date:  Joi.string().required().min(1).max(50).rule({ message: 'date must be between 1 and 11' }),
    description:  Joi.string().allow(''),
    total:  Joi.number().required().min(1).max(50000).rule({ message: 'total must be between 1 and 22' }), 
})