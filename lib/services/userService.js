const userRepository = require("../repositories/userRepository")

const userService = {
    login:(req, res, next) => {
        console.log("b")
        console.log(req.body['email'])
        userRepository.getByEmail(req.body['email']).then((user) => {
            console.log("wesh")
            console.log(user)
            res.cookie('userId', "wesh")
            res.redirect('/events')
          })
    },
    validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}

module.exports = userService