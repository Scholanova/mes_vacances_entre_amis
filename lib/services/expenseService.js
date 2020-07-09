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
	},
    getByEventIdWithTotalAmount: async (eventid) => {
		let expenses = await expenseRepository.getAllByEventId(eventid)
		let _round = (a) => Math.round( ( a + Number.EPSILON ) * 100 ) / 100
		for( const expense of expenses) {
			let participants = await participantRepository.getFromExpense(expense.id)
				let total = 0
				participants.forEach(participant => {
					total = total+participant.amount
				})
				expense.total = _round(total)
		}
		return expenses        
    },
    getByIdWithTotalAndParticipant: async (expenseid) => {
        let expense = await expenseRepository.get(expenseid)
        let participants = await participantRepository.getFromExpense(expense.id)
		let total = 0
		let _round = (a) => Math.round( ( a + Number.EPSILON ) * 100 ) / 100
        for(const participant of participants)
        {
            total = total+participant.amount
            participant.user = await participant.getUser()
        }
        expense.participants = participants
        expense.total = _round(total)
        return expense
    }
}

module.exports = expenseService