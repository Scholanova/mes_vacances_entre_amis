const Joi = require('@hapi/joi')
const participantRepository = require('../repositories/participantRepository')

const participantSchema = Joi.object({
  pseudo: Joi.string().required()
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