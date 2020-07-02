const models = require('../models')
const Event = models.Event


const eventRepository = {
    create: (eventData) => {
        const event = new Event(eventData)
        return event.save()
    },
}

module.exports = eventRepository