const userRepository = require("../repositories/userRepository")

const userService = {
    login:(req, res, next) => {
        console.log("b")
        console.log(req.body['email'])
        console.log(userRepository.getByEmail(req.body['email']))
        res.cookie('userId', "wesh")
    }
}

module.exports = userService