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
    getAllByEventId: (eventid) =>{
        let expenses = Expense.findAll({ wherel: {eventid}})
        return expenses
    }
}

module.exports = expenseRepository