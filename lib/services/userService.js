const userRepository = require("../repositories/userRepository")
const { LoginError } = require('../errors')

const userService = {
    login:(req, res, next) => {
        console.log("b")
        console.log(req.body['email'])
        userRepository.getByEmail(req.body['email']).then((user) => {
            if(user.email === req.body['email'] && user.password === req.body['password'])
            {
                res.cookie('userId', "logge")
                res.redirect('/event')
            }
            else
            {
                //res.cookie('userId', "pas_logge")
               // res.render('events', { title: 'event' })
               return res.render('error', { title: 'Erreur', message:"la combinaison mail/mot de passe ne corespond pas à un utilisateur.", error: {status: "Erreur Utilisateur veuillez reessayer." } });
            }
            console.log("wesh")
            console.log(user)
            console.log(user.email)
            console.log(user.password)
          })
    },
    validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}

module.exports = userService