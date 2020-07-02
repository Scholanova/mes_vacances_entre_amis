const Joi = require('@hapi/joi')
const eventRepository = require('../repositories/eventRepository')


const eventSchema = Joi.object({
    name: Joi.string().min(6, 'utf8').required()
        .messages({
            'string.min': 'Le nom de l\'événement dois contenir minimun 6 caractères',
            'string.empty': 'Le nom de l\'événement est requis',
            'any.required': 'Le nom de l\'événement est requis'
        }),
    dateStart: Joi.date().iso().required()
        .messages({
            'any.required': 'L\'événement doit avoir une date de début',
            'date.format': 'Format de date invalide'
        }),
    dateEnd: Joi.date().iso().min(Joi.ref('dateStart')).required()
        .messages({
            'any.required': 'L\'événement doit avoir une date de fin',
            'date.min': 'La date de fin de l\'événement doit être supérieur à celle de début',
            'date.format': 'Format de date invalide'
        }),
    place: Joi.string().optional()
})


module.exports = {
    create: (eventData) => {
        return Promise.resolve(eventData)
            .then( eventData => {
                const { value, error } = eventSchema.validate(eventData, { abortEarly: false })
                
                if ( error ) throw error

                return value
            })
            .then(eventRepository.create)
    }
}