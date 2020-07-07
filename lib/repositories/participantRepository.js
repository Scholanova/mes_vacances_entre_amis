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
        return participant.save()
    },
    listAll: () => {
        return Participant.findAll()
        }
    }

module.exports = participantRepository
