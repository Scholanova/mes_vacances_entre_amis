const models = require('../models')
const Participant = models.Participant

const participantRepository = {
    create: (participantData) => {
        let participant = new Participant(participantData)
        return Participant.save()
    },
    getFromExpense: async (expenseId) => {
        console.log(expenseId)
        let participants = Participant.findAll({ where: {expenseId}})
        return participants
    }
}

module.exports = participantRepository