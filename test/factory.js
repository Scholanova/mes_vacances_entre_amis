const { Event, Expense } = require('../lib/models')


const factory = {
    createEventData: ({
        name = 'Petite vacance chill',
        dateStart = new Date(2020, 10, 24),
        dateEnd = new Date(2020, 11, 5),
        place = 'Dubai'
    } = {}) => {
        return { name, dateStart, dateEnd, place }
    },
    createEvent: ({
        id = null,
        name = 'Petits vacance chill',
        dateStart = new Date(2020, 10, 24),
        dateEnd = new Date(2020, 11, 5),
        place = 'Dubai'
    } = {}) => {
        return new Event({ id, name, dateStart, dateEnd, place })
    },
    createExpenseData: ({
        name = 'Péage allé',
        eventId = 1000001
    } = {}) => {
        return { name, eventId }
    },
    createExpense: ({
        id = null,
        name = 'Péage allé',
        eventId = 1000001
    } = {}) => {
        return new Expense({ id, name, eventId })
    }
}

module.exports = factory
