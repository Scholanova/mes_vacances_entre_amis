const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const User = models.User

const userRepository = {
  getByEmail: (email) => {
          return User.findOne({ where: { email } })
          .then((userResult) => {
              if (userResult === null) {
                  throw new ResourceNotFoundError()
              }
              return userResult
          })
      },

  create: (userData) => {
    const user = new User(userData)
    return user.save()
  }

}

module.exports = userRepository
