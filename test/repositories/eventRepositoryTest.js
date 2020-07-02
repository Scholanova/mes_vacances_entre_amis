const { expect, factory } = require('../testHelper')
const eventRepository = require('../../lib/repositories/eventRepository')
const Event = require('../../lib/models').Event


describe('eventRepository', () => {
    
    afterEach(async () => {
        await Event.destroy({ where: {} })
    })
    
    describe('create', () => {
        
        let createdEvent
        let retrievedEvent
        let eventData
        
        beforeEach(async () => {
            // given
            eventData = factory.createEventData()
            
            // when
            createdEvent = await eventRepository.create(eventData)
        })
        
        // then
        it('should return a event with the right properties', async () => {
            const createdEventValue = createdEvent.get()
            
            expect(createdEventValue.name).to.equal(eventData.name)
            expect(createdEventValue.dateStart.toISOString()).to.equal(eventData.dateStart.toISOString())
            expect(createdEventValue.dateEnd.toISOString()).to.equal(eventData.dateEnd.toISOString())
            expect(createdEventValue.place).to.equal(eventData.place)
            
            retrievedEvent = await eventRepository.get(createdEvent.id)
            const retrievedEventValue = retrievedEvent.get()
            
            expect(createdEventValue).to.deep.equal(retrievedEventValue)
        })

    })
    
})