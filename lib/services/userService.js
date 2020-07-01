const userRepository = require("../repositories/userRepository")

const userService = {
    login:(req, res, next) => {
        console.log("b")
        console.log(req.body['email'])
        userRepository.getByEmail(req.body['email']).then((user) => {
            if(user.email === req.body['email'] && user.password === req.body['password'])
            {
                res.cookie('userId', "logge")
                res.render('events', { title: 'event' })
            }
            else
            {
                res.cookie('userId', "pas_logge")
                res.render('events', { title: 'event' })
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