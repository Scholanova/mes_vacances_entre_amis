const models = require('../models')
const Expense = models.Expense


const expenseRepository = {
    create: (expenseData) => {
        const expense = new Expense(expenseData)
        return expense.save()
    }
}

module.exports = expenseRepository