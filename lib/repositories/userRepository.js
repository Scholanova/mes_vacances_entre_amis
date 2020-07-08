const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const User = models.User

const userRepository = {
    get: (email, pseudo) => {
        return User.find({ where: { email, pseudo } })
        .then((userResult) => {
            if (userResult !== null) {
                throw new ResourceNotFoundError()
            }
            return userResult
        })
    },
    getById : (id) => {
        return User.findOne({ where: { id } })
        .then((userResult) => {
            if (userResult === null) {
                throw new ResourceNotFoundError()
            }
            return userResult
        })
    },
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
    },
    delete: (id) => {
        return user.destroy({ where: { id } })
    },
    listAll: () => {
        return User.findAll()
    }





}

module.exports = userRepository
