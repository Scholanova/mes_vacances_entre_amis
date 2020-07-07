const models = require('../models')
const Event = models.Event


const eventRepository = {
    get: async(id) => {
        return Event.findOne({ where: { id }})
            .then( eventResult => {
                return eventResult
            })
    },
    create: (eventData) => {
        const event = new Event(eventData)
        return event.save()
    },
    listAll: () => {
        return Event.findAll()
        }
    }
    
    module.exports = eventRepository
