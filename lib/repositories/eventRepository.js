const models = require('../models')
const Event = models.Event
const User = models.User

const eventRepository = {
    get: (id) => {
        return Event.findOne({ where: { id }})
            .then( eventResult => {
                return eventResult
            })
    },
    listByUser : (user) => {
        return user.getEvents();
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
