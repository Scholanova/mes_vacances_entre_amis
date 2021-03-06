const { Event, Expense, Participant, User } = require('../lib/models')

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
        eventId = 1000001,
        participants = [
            { userId: 1000001, amount: 100 },
            { userId: 1000002, amount: 0 },
        ]
    } = {}) => {
        return { name, eventId, participants }
    },
    createExpense: ({
        id = null,
        name = 'Péage allé',
        eventId = 1000001
    } = {}) => {
        return new Expense({ id, name, eventId })
    },
    createParticipant: ({
        id = null,
        userId = 1000001,
        expenseId = 1000001,
        amount = 0
    } = {}) => {
        return new Participant({ id, userId, expenseId, amount })
    },
    createParticipantData: ({

    }) => {

    },
    createUser: ({
        id = null,
        pseudo = 'LePanda',
        email = 'lepanda@gmail.com',
        password = '123456'
    } = {}) => {
        return new User({ id, pseudo, email, password })
    },
    createUserData: ({
        pseudo = 'LePanda',
        email = 'lepanda@gmail.com',
        password = '123456'
    } = {}) => {
        return { id, pseudo, email, password }
    }
}

module.exports = factory
