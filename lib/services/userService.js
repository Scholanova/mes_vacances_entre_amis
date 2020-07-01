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
    }
}

module.exports = userService