const userService = {
    login:(req, res, next) => {
        res.cookie('userId', "wesh")
    }
}

module.exports = userService