const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')

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
      })
      .then(userRepository.create)
      userRepository.getByEmail(req.body['email']).then((user) => {
                    if(user.email !== req.body['email'] && user.pseudo !== req.body['pseudo'])
                    {
                            res.redirect('/')

                    }
                    else
                    {
                       return res.render('error', { title: 'Erreur', message:"l'email ou le pseudo existe déja.", error: {status: "Veuillez saisir un autre." } });
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
