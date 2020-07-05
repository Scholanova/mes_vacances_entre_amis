const Joi = require('@hapi/joi')
const router = require('express').Router()
const userService = require('../services/userService')


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Vacances Entre amis' });
});


/* POST login page. */
router.post('/', async function(req, res, next) {

    let loginData = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        let session = await userService.login(loginData)
        res.cookie('userId', session.token)
        res.redirect('/events')
    } catch ( error ) {
        if (error instanceof Joi.ValidationError) {
            res.render('index', {
                title: 'Vacances Entre amis',
                values: loginData,
                failedFields: error.details
            })
        } else {
            next(error)
        }
    }
});

module.exports = router;