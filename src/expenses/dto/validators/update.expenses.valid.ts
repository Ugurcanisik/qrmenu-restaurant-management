import * as Joi from 'joi'

export default Joi.object().keys({
    typeexpense: Joi.string().required().min(1).rule({ message: 'Gider Türü Zorunlu Alandır' }),
    description: Joi.string().allow(''),
    personnel: Joi.string().allow(''),
    date:  Joi.string().required().min(1).max(50).rule({ message: 'Tarih Zorunlu Alandır' }),
    total:  Joi.number().required().min(1).max(50000).rule({ message: 'Toplam Zorunlu Alandır' }), 
    id: Joi.string().required()
})