const models = require('../models')
const Participant = models.Participant
const User = models.User
const participantRepository = {
    get: async (id) => {
        return Participant.findOne({ where: { id }})
            .then( participantResult => {
                return participantResult
            })
    },

    create: (participantData) => {
        let participant = new Participant(participantData)
        return participant.save()
    },

    listAll: () => {

        return Participant.findAll()
    },

    getFromExpense: async (expenseId) => {
        console.log(expenseId)
        let participants = Participant.findAll({ where: {expenseId}})
        return participants
    },

     listAllUsers: () => {
            return User.findAll()

     }


}

module.exports = participantRepository
