const Joi = require('@hapi/joi')
const participantRepository = require('../repositories/participantRepository')
const userRepository = require('../repositories/userRepository')

const participantSchema = Joi.object({
      participants: Joi.array().items(
          Joi.object({
              userId: Joi.number().required(),
              //expenseId: Joi.number(),
              amount: Joi.number().min(0)
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
      //participant
      let participant = await participantRepository.create({
          eventId: value.eventId,
          userId: value.userId,
          amount: 0

      })

      //* Creating all participants
      for(let i = 1; i < value.participants.length; i++) {
          let participantData = value.participants[i]
          let participant = await participantRepository.create({
              userId: participantData.userId



          })
      }

  },
      listAllUsers: () => {
             return userRepository.listAllUsers()
      }
  }


module.exports = participantService