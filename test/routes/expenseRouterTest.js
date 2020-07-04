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
            
            let name, dateStart, dateEnd, place
            
            beforeEach(async () => {
                // given
                name = 'Voyage en Italie'
                dateStart = new Date()
                dateEnd = new Date()
                place = 'Italie'
                expense = factory.createExpense({ name, dateStart, dateEnd, place })
                
                expenseService.create.resolves(expense)
                
                // when
                response = await request(app).post('/expenses/new')
                .type('form')
                .send({ 
                    name, dateStart, dateEnd, place
                })
                .redirects(0)
            })
            
            it('should call the servie with expense data', () => {
                // then
                expect(expenseService.create).to.have.been.calledWith({ 
                    name: name, 
                    dateStart: dateStart.toISOString(), 
                    dateEnd: dateEnd.toISOString(), 
                    place: place
                })
            })
            
            it('should succeed with a status 302', () => {
                // then
                expect(response).to.have.status(302)
            })
            
            it('should redirect to expense list page', () => {
                // then
                expect(response).to.redirectTo('/expenses')
            })
            
        })
        
        //* name
        context('when the name is missing', () => {
            
            let dateStart, dateEnd, place
            let validationError
            
            beforeEach(async () => {
                // given
                dateStart = new Date()
                dateEnd = new Date()
                place = 'Italie'
                errorDetails = [{
                    message: 'Le nom de l\'événement est requis',
                    path: ["name"],
                    type: "any.required",
                    context: { label: "name", key: "name" }
                }]
                errorMessage = 'Le nom de l\'événement est requis'
                validationError = new Joi.ValidationError(errorMessage, errorDetails, undefined)
                
                expenseService.create.rejects(validationError)
                
                // when
                response = await request(app).post('/expenses/new')
                                            .type('form')
                                            .send({ dateStart, dateEnd, place })
                                            .redirects(0)
            })
            
            it('should call the service with expense data', () => {
                // then
                expect(expenseService.create).to.have.been.calledWith({
                    name: undefined,
                    dateStart: dateStart.toISOString(), 
                    dateEnd: dateEnd.toISOString(), 
                    place: place
                })
            })

            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })

            it('should show create expense page with error message', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Création d\'événement')
                expect(response.text).to.contain('Le nom de l&#39;événement est requis')
            })
            
        })
        
        context('when the name have less than 6 characters', () => {
            
            let name, dateStart, dateEnd, place
            let validationError
            
            beforeEach(async () => {
                // given
                name = 'Small'
                dateStart = new Date()
                dateEnd = new Date()
                place = 'Italie'
                errorDetails = [{
                    message: 'Le nom de l\'événement doit contenir minimun 6 caractères',
                    path: ["name"],
                    type: "string.min",
                    context: { label: "name", key: "name" }
                }]
                errorMessage = 'Le nom de l\'événement doit contenir minimun 6 caractères'
                validationError = new Joi.ValidationError(errorMessage, errorDetails, undefined)
                
                expenseService.create.rejects(validationError)
                
                // when
                response = await request(app).post('/expenses/new')
                                            .type('form')
                                            .send({ name, dateStart, dateEnd, place })
                                            .redirects(0)
            })
            
            it('should call the service with expense data', () => {
                // then
                expect(expenseService.create).to.have.been.calledWith({
                    name: name,
                    dateStart: dateStart.toISOString(), 
                    dateEnd: dateEnd.toISOString(), 
                    place: place
                })
            })

            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })

            it('should show create expense page with error message', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Création d\'événement')
                expect(response.text).to.contain('Le nom de l&#39;événement doit contenir minimun 6 caractères')
            })
            
        })

        //* dateStart
        context('when the dateStart is missing', () => {
            
            let name, dateEnd, place
            let validationError
            
            beforeEach(async () => {
                // given
                dateStart = new Date()
                dateEnd = new Date()
                place = 'Italie'
                errorDetails = [{
                    message: 'L\'événement doit avoir une date de début',
                    path: ["dateStart"],
                    type: "any.required",
                    context: { label: "dateStart", key: "dateStart" }
                }]
                errorMessage = 'L\'événement doit avoir une date de début'
                validationError = new Joi.ValidationError(errorMessage, errorDetails, undefined)
                
                expenseService.create.rejects(validationError)
                
                // when
                response = await request(app).post('/expenses/new')
                                            .type('form')
                                            .send({ name, dateEnd, place })
                                            .redirects(0)
            })
            
            it('should call the service with expense data', () => {
                // then
                expect(expenseService.create).to.have.been.calledWith({
                    name: name,
                    dateStart: undefined, 
                    dateEnd: dateEnd.toISOString(), 
                    place: place
                })
            })

            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })

            it('should show create expense page with error message', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Création d\'événement')
                expect(response.text).to.contain('L&#39;événement doit avoir une date de début')
            })
            
        })

        // TODO: Tester la validation du format des dates

        //* dateEnd
        context('when the dateEnd is missing', () => {
            
            let name, dateStart, place
            let validationError
            
            beforeEach(async () => {
                // given
                name = 'Voyage en Italie'
                dateStart = new Date()
                place = 'Italie'
                errorDetails = [{
                    message: 'L\'événement doit avoir une date de fin',
                    path: ["dateStart"],
                    type: "any.required",
                    context: { label: "dateStart", key: "dateStart" }
                }]
                errorMessage = 'L\'événement doit avoir une date de fin'
                validationError = new Joi.ValidationError(errorMessage, errorDetails, undefined)
                
                expenseService.create.rejects(validationError)
                
                // when
                response = await request(app).post('/expenses/new')
                                            .type('form')
                                            .send({ name, dateStart, place })
                                            .redirects(0)
            })
            
            it('should call the service with expense data', () => {
                // then
                expect(expenseService.create).to.have.been.calledWith({
                    name: name,
                    dateStart: dateStart.toISOString(), 
                    dateEnd: undefined, 
                    place: place
                })
            })

            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })

            it('should show create expense page with error message', () => {
                // then
                expect(response).to.be.html
                expect(response.text).to.contain('Création d\'événement')
                expect(response.text).to.contain('L&#39;événement doit avoir une date de fin')
            })
            
        })

    })
    
})