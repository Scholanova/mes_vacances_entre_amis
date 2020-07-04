const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')
const { LoginError } = require('../errors')
const sessionRepository = require("../repositories/sessionRepository")
const bcrypt = require('bcrypt');


const userSchema = Joi.object({
    pseudo: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required()
        .messages({
            'string.empty': 'L\'adresse email est requise',
            'email.format': 'L\'adresse email est invalide',
            'any.required': 'L\'adresse email est requise'
        }),
    password: Joi.string().required()
        .messages({
            'string.empty': 'Le mot de passe est requis',
            'any.required': 'Le mot de passe est requis'
        })
})


const userService = {

    create: async (userData) => {
        let { value, error } = loginSchema.validate(userData, { abortEarly: false })

        if ( error ) throw error

        let user = await userRepository.create({
            pseudo: value.pseudo,
            email: value.email,
            password: bcrypt.hashSync(value.password, 10)
        })

        return user
    },

    login: async (loginData) => {
        //* Checking required fields
        let { value, error } = loginSchema.validate(loginData, { abortEarly: false })

        if ( error ) throw error

        //* Checking if User exist
        let user = await userRepository.getByEmail(value.email)
        if ( !user ) {
            throw 'USER_NOT_EXIST'
        }

        //* Checking user password
        if ( !bcrypt.compareSync(value.password, user.password) ) {
            throw 'WRONG_PASSWORD'
        }

        //* User authentified, we create the Session and the token
        let session = await sessionRepository.create({ token: user.email, userId: user.id })

        return session
    },

    validateEmail(email)
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}

module.exports = userService