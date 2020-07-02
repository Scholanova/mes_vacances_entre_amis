const models = require('../lib/models')
const Event = models.Event


const factory = {
    createEvent: ({
        id = null,
        name = 'Petit vacance chill',
        dateStart = new Date(),
        dateEnd = new Date(),
        place = 'Dubai'
    } = {}) => {
        return new Event({ id, name, dateStart, dateEnd, place })
    }
}

module.exports = factory
