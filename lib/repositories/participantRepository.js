const models = require('../models')
const Participant = models.Participant

const participantRepository = {
    create: (participantData) => {
        let participant = new Participant(participantData)
        return Participant.save()
    }
}

module.exports = participantRepository