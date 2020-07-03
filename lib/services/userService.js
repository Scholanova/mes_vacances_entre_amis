const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')
const { LoginError } = require('../errors')
const sessionRepository = require("../repositories/sessionRepository")

const userSchema = Joi.object({
  pseudo: Joi.string().required(),
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
        userRepository.getByEmail
      })
      .then(userRepository.create)



  },
     login:(req, res, next) => {
              userRepository.getByEmail(req.body['email']).then((user) => {
                  if(user.email === req.body['email'] && user.password === req.body['password'])
                  {
                      sessionRepository.create({token:user.email, userId:user.id}).then((session) =>{
                          res.cookie('userId', session.token)
                          res.redirect('/events/new')
                      })
                  }
                  else
                  {
                     return res.render('error', { title: 'Erreur', message:"la combinaison mail/mot de passe ne corespond pas à un utilisateur.", error: {status: "Erreur Utilisateur veuillez reessayer." } });
                  }
                })
          },

      validateEmail(email)
      {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
      }
  }
module.exports = userService
