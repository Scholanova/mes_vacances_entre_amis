const Joi = require('@hapi/joi')
const { expect, sinon, factory } = require('../testHelper')
const eventService = require('../../lib/services/eventService')
const eventRepository = require('../../lib/repositories/eventRepository')
const Event = require('../../lib/models').Event


describe('eventService', () => {
    
    describe('create', () => {
        
        let eventData
        let eventCreationPromise
        
        beforeEach(() => {
            sinon.stub(eventRepository, 'create')
        })
        
        context('when the event data is valid', () => {
            
            let event
            
            beforeEach(() => {
                // given
                eventData = factory.createEventData()
                event = new Event(eventData)
                eventRepository.create.resolves(event)
                
                // when
                eventCreationPromise = eventService.create(eventData)
            })
            
            // then
            it('should call the event Repository with the creation data', async () => {
                // then
                await eventCreationPromise.catch(() => {})
                expect(eventRepository.create).to.have.been.calledWith(eventData)
            })

            it('should resolve with the created event from reprository', () => {
                // then
                return expect(eventCreationPromise).to.eventually.equal(event)
            })
        })
        
        //* Field: name
        context('when the event name is missing', () => {
            
            beforeEach(() => {
                // given
                eventData = factory.createEventData()
                eventData.name = undefined
                
                // when
                eventCreationPromise = eventService.create(eventData)
            })
            
            it('should not call the event Repository', async () => {
                // then
                await eventCreationPromise.catch(() => {})
                expect(eventRepository.create).to.not.have.been.called
            })
            
            it('should reject with a ValidationError error about missing name', () => {
                // then
                const expectedErrorDetails = [{
                    message: 'Le nom de l\'événement est requis',
                    path: ['name'],
                    type: 'any.required',
                    context: { label: 'name', key: 'name' }
                }]
                
                return expect(eventCreationPromise)
                .to.eventually.be.rejectedWith(Joi.ValidationError)
                .with.deep.property('details', expectedErrorDetails)
            })
        })
        context('when the event name is to short', () => {
            
            beforeEach(() => {
                // given
                eventData = factory.createEventData({ name: 'Small' })
                
                // when
                eventCreationPromise = eventService.create(eventData)
            })
            
            it('should not call the event Repository', async () => {
                // then
                await eventCreationPromise.catch(() => {})
                expect(eventRepository.create).to.not.have.been.called
            })

            it('should reject with a ValidationError error about name being too short', () => {
                // then
                const expectedErrorDetails = [{
                    message: 'Le nom de l\'événement dois contenir minimun 6 caractères',
                    path: ['name'],
                    type: 'string.min',
                    context: { label: 'name', key: 'name', value: 'Small', limit: 6, encoding: 'utf8' }
                }]
                return expect(eventCreationPromise)
                .to.eventually.be.rejectedWith(Joi.ValidationError)
                .with.deep.property('details', expectedErrorDetails)
            })
        })
        
        //* Field: dateStart
        context('when the event dateStart is missing', () => {
            
            beforeEach(() => {
                // given
                eventData = factory.createEventData()
                eventData.dateStart = undefined
                
                // when
                eventCreationPromise = eventService.create(eventData)
            })
            
            it('should not call the event Repository', async () => {
                // then
                await eventCreationPromise.catch(() => {})
                expect(eventRepository.create).to.not.have.been.called
            })

            it('should reject with a ValidationError error about missing dateStart', () => {
                // then
                const expectedErrorDetails = [{
                    message: 'L\'événement doit avoir une date de début',
                    path: ['dateStart'],
                    type: 'any.required',
                    context: { label: 'dateStart', key: 'dateStart' }
                }]
                
                return expect(eventCreationPromise)
                .to.eventually.be.rejectedWith(Joi.ValidationError)
                .with.deep.property('details', expectedErrorDetails)
            })
        })
        context('when the event dateStart is not valid', () => {
            
            beforeEach(() => {
                // given
                eventData = factory.createEventData({ dateStart: '1er Juin 2020' })
                
                // when
                eventCreationPromise = eventService.create(eventData)
            })
            
            it('should not call the event Repository', async () => {
                // then
                await eventCreationPromise.catch(() => {})
                expect(eventRepository.create).to.not.have.been.called
            })

            it('should reject with a ValidationError error about invalid dateStart format', () => {
                // then
                const expectedErrorDetails = [{
                    message: 'Format de date invalide',
                    path: ['dateStart'],
                    type: 'date.format',
                    context: {
                        format: 'iso',
                        label: 'dateStart', 
                        key: 'dateStart', 
                        value: '1er Juin 2020'
                    },
                    
                }]
                
                return expect(eventCreationPromise)
                .to.eventually.be.rejectedWith(Joi.ValidationError)
                .with.deep.property('details', expectedErrorDetails)
            }
            )
        })
        
        //* Field: dateEnd
        context('when the event dateEnd is missing', () => {
            
            beforeEach(() => {
                // given
                eventData = factory.createEventData()
                eventData.dateEnd = undefined
                
                // when
                eventCreationPromise = eventService.create(eventData)
            })
            
            it('should not call the event Repository', async () => {
                // then
                await eventCreationPromise.catch(() => {})
                expect(eventRepository.create).to.not.have.been.called
            })

            it('should reject with a ValidationError error about missing dateEnd', () => {
                // then
                const expectedErrorDetails = [{
                    message: 'L\'événement doit avoir une date de fin',
                    path: ['dateEnd'],
                    type: 'any.required',
                    context: { label: 'dateEnd', key: 'dateEnd' }
                }]
                
                return expect(eventCreationPromise)
                .to.eventually.be.rejectedWith(Joi.ValidationError)
                .with.deep.property('details', expectedErrorDetails)
            })
        })
        context('when the event dateEnd is not valid', () => {
            
            beforeEach(() => {
                // given
                eventData = factory.createEventData({ dateEnd: '1er Juin 2020' })
                
                // when
                eventCreationPromise = eventService.create(eventData)
            })
            
            it('should not call the event Repository', async () => {
                // then
                await eventCreationPromise.catch(() => {})
                expect(eventRepository.create).to.not.have.been.called
            })

            it('should reject with a ValidationError error about invalid dateEnd format', () => {
                // then
                const expectedErrorDetails = [{
                    message: 'Format de date invalide',
                    path: ['dateEnd'],
                    type: 'date.format',
                    context: {
                        format: 'iso',
                        label: 'dateEnd', 
                        key: 'dateEnd', 
                        value: '1er Juin 2020'
                    },
                    
                }]
                
                return expect(eventCreationPromise)
                .to.eventually.be.rejectedWith(Joi.ValidationError)
                .with.deep.property('details', expectedErrorDetails)
            }
            )
        })
        
    })
    
})