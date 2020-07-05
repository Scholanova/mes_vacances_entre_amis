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
    }
}

module.exports = expenseRepository