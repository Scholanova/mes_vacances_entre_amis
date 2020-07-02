const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const Session = models.Session

const sessionRepository = {
  get: (id) => {
    return Session.findOne({ where: { id } })
      .then((userResult) => {
        if (userResult === null) {
          throw new ResourceNotFoundError()
        }
        return userResult
      })
  },
  create: (sessionData) => {
    const ses = new Session(sessionData)
    return ses.save()
  },
  delete: (id) => {
    return ses.destroy({ where: { id } })
  },
  listAll: () => {
    return Session.findAll()
  }
}

module.exports = sessionRepository