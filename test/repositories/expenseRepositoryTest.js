const { expect, factory } = require('../testHelper')
const expenseRepository = require('../../lib/repositories/expenseRepository')
const { Expense } = require('../../lib/models')


describe('expenseRepository', () => {
    
    afterEach(async () => {
        await Expense.destroy({ where: {} })
    })
    
    describe('create', () => {
        
        let createdExpense
        let retrievedExpense
        let expenseData
        
        beforeEach(async () => {
            // given
            expenseData = factory.createExpenseData()
            
            // when
            createdExpense = await expenseRepository.create(expenseData)
        })
        
        // then
        it('should return a expense with the right properties', async () => {
            const createdExpenseValue = createdExpense.get()
            
            expect(createdExpenseValue.name).to.equal(expenseData.name)
            expect(createdExpenseValue.eventId).to.equal(expenseData.eventId)
            // expect(createdExpenseValue.dateEnd.toISOString()).to.equal(expenseData.dateEnd.toISOString())
            // expect(createdExpenseValue.place).to.equal(expenseData.place)
            
            retrievedExpense = await expenseRepository.get(createdExpense.id)
            const retrievedExpenseValue = retrievedExpense.get()
            
            expect(createdExpenseValue).to.deep.equal(retrievedExpenseValue)
        })

    })
    
})