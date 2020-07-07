const Joi = require('@hapi/joi')
const participantRepository = require('../repositories/participantRepository')

const participantSchema = Joi.object({
  const participantSchema = Joi.object({
      eventId: Joi.number().required(),
      participants: Joi.array().items(
          Joi.object({
              userId: Joi.number().required()
          })
      )
  })
})

const participantService = {
  create: (participantData) => {
    return Promise.resolve(participantData)
      .then((participantData) => {
        const { value, error } = participantSchema.validate(participantData, { abortEarly: false })
        if (error) { throw error }
         return value
        participantRepository.getByEmail
      })
      .then(participantRepository.create)

  },


  const participantService = {
      create: async (participantData) => {
          //* Checking required fields
          const { value, error } = participantSchema.validate(participantData, { abortEarly: false })

          if ( error ) throw error
          //* Creating the Expense object
          let participant = await participantRepository.create({
              eventId: value.eventId,
              name: value.name
          })

          //* Creating all participants
          for(let i = 0; i < value.participants.length; i++) {
              let participantData = value.participants[i]
              let participant = await participantRepository.create({
                  userId: participantData.userId,
                  eventId: event.id

              })
          }
      }
  }

module.exports = participantService