const router = require('express').Router()
const Joi = require('@hapi/joi')
const userService = require('../services/userService')



/* GET signup page. */
router.get('/new', function (req, res, next) {
    res.render('users/new')
});

/* POST signup page. */
router.post('/new', async function (req, res, next) {
    const userData = {
        pseudo: req.body['pseudo'],
        email: req.body['email'],
        password: req.body['password']
    }

    try {
        let user = userService.create(userData)
        return  res.redirect(`/`)
    } catch ( error ) {
        if (error instanceof Joi.ValidationError) {
            return res.render('users/new', {
                values: userData,
                failedFields: error.details
            })
        } else {
            next(error)
        }
    }

});


module.exports = router