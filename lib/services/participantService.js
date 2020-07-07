const Joi = require('@hapi/joi')
const participantRepository = require('../repositories/participantRepository')
const userRepository = require('../repositories/userRepository')

const participantSchema = Joi.object({
      eventId: Joi.number().required(),
      participants: Joi.array().items(
          Joi.object({
              userId: Joi.number().required()
          })
      )
})

const userSchema = Joi.object({
          pseudo: Joi.string().required()
})

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

  },
      listAll: () => {
             return userRepository.listAll()
      }
  }


module.exports = participantService