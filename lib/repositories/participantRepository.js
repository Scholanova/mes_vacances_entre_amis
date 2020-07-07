const models = require('../models')
const Participant = models.Participant

const participantRepository = {
    get: async (id) => {
        return Participant.findOne({ where: { id }})
            .then( participantResult => {
                return participantResult
            })
    },
    create: (participantData) => {
        let participant = new Participant(participantData)
        return Participant.save()
    },
    listAll: () => {
        return Participant.findAll()
    },
    getFromExpense: async (expenseId) => {
        console.log(expenseId)
        let participants = Participant.findAll({ where: {expenseId}})
        return participants
    }
}

module.exports = participantRepository
