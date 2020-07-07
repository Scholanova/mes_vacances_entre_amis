const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const app = require('../../lib/app')
const expenseService = require('../../lib/services/expenseService')


describe('expenseRouter', () => {
    
    describe('create - GET', () => {
        
        let response
        
        beforeEach(async () => {
            // given
            let event = factory.createEvent()
            await event.save()
            
            // when
            response = await request(app).get(`/events/${event.id}/expenses/new`)
        })
        
        it('should succeed with a status 200', () => {
            // then
            expect(response).to.have.status(200)
        })
        
        it('should return new create expense page', () => {
            // then
            expect(response).to.be.html
            expect(response.text).to.contain('Création d\'une dépense')
        })
        
    })
    
    describe('create - POST', () => {
        
        let response
        
        beforeEach(() => {
            sinon.stub(expenseService, 'create')
        })
        
        context('when the expense creation succeeds', () => {
            
            let name, eventId
            
            beforeEach(async () => {
                // given                
                name = 'Course du lundi'
                event = factory.createEvent()
                await event.save()
                eventId = event.id.toString()
                expense = factory.createExpense({ name, eventId })

                expenseService.create.resolves(expenseService)
                
                // when
                response = await request(app).post(`/events/${eventId}/expenses/new`)
                                            .set('content-type', 'application/json')
                                            .send({ 
                                                name, eventId,
                                                participants: ['1000001', '1000002'],
                                                amount: ['100', '0']
                                            })
                                            .redirects(0)
            })
            
            it('should call the servie with expense data', () => {
                // then
                expect(expenseService.create).to.have.been.calledWith({ 
                    name: name, 
                    eventId: eventId,
                    participants: [
                        { userId: '1000001', amount: '100' },
                        { userId: '1000002', amount: '0' }
                    ]
                })
            })
            
            it('should succeed with a status 302', () => {
                // then
                expect(response).to.have.status(302)
            })
            
            it('should redirect to expense list page', () => {
                // then
                expect(response).to.redirectTo(`/events/${eventId}/expenses`)
            })
            
        })
        
        //* name
        context('when the name is missing', () => {
            
            let eventId
            let validationError
            
            beforeEach(async () => {
                // given
                event = factory.createEvent()
                await event.save()
                eventId = event.id.toString()

                errorDetails = [{
                    message: 'Le nom de la dépense est requis',
                    path: ["name"],
                    type: "any.required",
                    context: { label: "name", key: "name" }
                }]
                errorMessage = 'Le nom de la dépense est requis'
                validationError = new Joi.ValidationError(errorMessage, errorDetails, undefined)
                
                expenseService.create.rejects(validationError)
                
                // when
                response = await request(app).post(`/events/${eventId}/expenses/new`)
                                            .set('content-type', 'application/json')
                                            .send({ 
                                                eventId,
                                                participants: ['1000001', '1000002'],
                                                amount: ['100', '0']
                                            })
                                            .redirects(0)
            })
            
            it('should call the service with expense data', () => {
                // then
                expect(expenseService.create).to.have.been.calledWith({
                    name: undefined,
                    eventId: eventId,
                    participants: [
                        { userId: '1000001', amount: '100' },
                        { userId: '1000002', amount: '0' }
                    ]
                })
            })

            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })

            it('should show create expense page with error message', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Création d\'une dépense')
                expect(response.text).to.contain('Le nom de la dépense est requis')
            })
            
        })
        
    })
    
})