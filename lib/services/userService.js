const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')

const userSchema = Joi.object({
  pseudo: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})


const userService = {
  create: (userData) => {
    return Promise.resolve(userData)
      .then((userData) => {
        const { value, error } = userSchema.validate(userData, { abortEarly: false })

        if (error) { throw error }
        return value
      })
      .then(userRepository.create)
  },
}

module.exports = userService
