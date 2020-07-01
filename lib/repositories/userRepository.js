const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const User = models.User

const userRepository = {
  get: (id) => {
    return User.findOne({ where: { id } })
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
  },
  delete: (id) => {
    return user.destroy({ where: { id } })
  },
  listAll: () => {
    return User.findAll()
  }
}

module.exports = userRepository