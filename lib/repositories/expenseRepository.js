const models = require('../models')
const Expense = models.Expense


const expenseRepository = {
    get: async (id) => {
        let expense = Expense.findOne({ where: { id}})
        return expense
    },
    create: (expenseData) => {
        const expense = new Expense(expenseData)
        return expense.save()
	},
	delete: async (id) => {
		let expense = await Expense.findOne({ where: { id }})
		await expense.destroy()
	},
    getAllByEventId: async (eventId) =>{
        let expenses = Expense.findAll({ where: {eventId}})
        return expenses
    }
}

module.exports = expenseRepository