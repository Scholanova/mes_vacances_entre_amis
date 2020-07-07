const Joi = require('@hapi/joi')
const expenseRepository = require('../repositories/expenseRepository')
const participantRepository = require('../repositories/participantRepository')


const expenseSchema = Joi.object({
    eventId: Joi.number().required(),
    name: Joi.string().required()
        .messages({
            'string.empty': 'Le nom de la dépense est requis',
            'any.required': 'Le nom de la dépense est requis'
        }),
    participants: Joi.array().items(
        Joi.object({
            userId: Joi.number().required(),
            amount: Joi.number().min(0).required()
        })
    )
})


const expenseService = {
    create: async (expenseData) => {
        //* Checking required fields
        const { value, error } = expenseSchema.validate(expenseData, { abortEarly: false })
        
        if ( error ) throw error
        //* Creating the Expense object
        let expense = await expenseRepository.create({
            eventId: value.eventId,
            name: value.name
        })

        //* Creating all participants
        for(let i = 0; i < value.participants.length; i++) {
            let participantData = value.participants[i]
            let participant = await participantRepository.create({
                userId: participantData.userId,
                expenseId: expense.id,
                amount: participantData.amount
            })
        }
    }
}

module.exports = expenseService