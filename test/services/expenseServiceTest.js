const Joi = require('@hapi/joi')
const { expect, sinon, factory } = require('../testHelper')
const expenseService = require('../../lib/services/expenseService')
const expenseRepository = require('../../lib/repositories/expenseRepository')
const participantRepository = require('../../lib/repositories/participantRepository')
const { Expense, Participant } = require('../../lib/models')


describe('expenseService', () => {
    
    describe('create', () => {

        let expenseData
        let expenseCreationPromise
        
        beforeEach(() => {
            sinon.stub(expenseRepository, 'create')
            sinon.stub(participantRepository, 'create')
        })
        
        context('when the expense data is valid', () => {
            
            let expense
            
            beforeEach(() => {
                // given
                expenseData = factory.createExpenseData()
                expense = new Expense(expenseData)
                expense.id = '10000001'
                expenseRepository.create.resolves(expense)
                expenseData.participants.forEach((participant, index) => {
                    participantRepository.create.onCall(index).resolves(new Participant({
                        userId: participant.userId,
                        expenseId: expenseData.id,
                        amount: participant.amount
                    }))
                })
                
                // when
                expenseCreationPromise = expenseService.create(expenseData)
            })
            
            // then
            it('should call the expense Repository with the creation data', async () => {
                // then
                await expenseCreationPromise.catch(() => {})
                expect(expenseRepository.create).to.have.been.calledWith({
                    eventId: expense.eventId,
                    name: expense.name
                })
            })

            it('should call the participant Repository with the creation data multiple times', async () => {
                // then
                await expenseCreationPromise.catch(() => {})
                expect(participantRepository.create).to.have.callCount(expenseData.participants.length)
                expenseData.participants.forEach((participant, index) => {
                    expect(participantRepository.create.getCall(index)).to.have.been.calledWith({
                        userId: participant.userId,
                        amount: participant.amount,
                        expenseId: expense.id
                    })
                })
            })
            
            it('should resolve with the created expense from reprository', () => {
                // then
                return expect(expenseCreationPromise).to.eventually.be.undefined
            })
        })
        
        //* Field: name
        context('when the expense name is missing', () => {
            
            beforeEach(() => {
                // given
                expenseData = factory.createExpenseData()
                expenseData.name = undefined
                
                // when
                expenseCreationPromise = expenseService.create(expenseData)
            })
            
            it('should not call the expense Repository', async () => {
                // then
                await expenseCreationPromise.catch(() => {})
                expect(expenseRepository.create).to.not.have.been.called
            })
            
            it('should reject with a ValidationError error about missing name', () => {
                // then
                const expectedErrorDetails = [{
                    message: 'Le nom de la dépense est requis',
                    path: ['name'],
                    type: 'any.required',
                    context: { label: 'name', key: 'name' }
                }]
                
                return expect(expenseCreationPromise)
                .to.eventually.be.rejectedWith(Joi.ValidationError)
                .with.deep.property('details', expectedErrorDetails)
            })
        })
        
    })

})