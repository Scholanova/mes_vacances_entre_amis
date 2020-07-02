const userRepository = require("../repositories/userRepository")
const { LoginError } = require('../errors')
const sessionRepository = require("../repositories/sessionRepository")

const userService = {
    login:(req, res, next) => {
        userRepository.getByEmail(req.body['email']).then((user) => {
            if(user.email === req.body['email'] && user.password === req.body['password'])
            {
                sessionRepository.create({token:user.email, userId:user.id}).then((session) =>{
                    res.cookie('userId', session.token)
                    res.redirect('/event')
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