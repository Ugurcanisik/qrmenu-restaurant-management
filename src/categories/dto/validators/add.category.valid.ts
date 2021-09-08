import * as Joi from 'joi'

export default Joi.object().keys({
    name: Joi.string().required().min(1).max(50).rule({ message: 'Name must be between 1 and 20' }),
})

// .regex(/^[a-zA-Z]$/)