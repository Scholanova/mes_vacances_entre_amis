const models = require('../lib/models')
const Event = models.Event


const factory = {
    createEventData: ({
        name = 'Petite vacance chill',
        dateStart = new Date(),
        dateEnd = new Date(),
        place = 'Dubai'
    } = {}) => {
        return { name, dateStart, dateEnd, place }
    },
    createEvent: ({
        id = null,
        name = 'Petits vacance chill',
        dateStart = new Date(),
        dateEnd = new Date(),
        place = 'Dubai'
    } = {}) => {
        return new Event({ id, name, dateStart, dateEnd, place })
    }
}

module.exports = factory
