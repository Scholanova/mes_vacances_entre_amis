const Joi = require('@hapi/joi')
const router = require('express').Router()


/* GET login page. */
router.get('/', function(req, res, next) {
    return res.redirect('/auth/signin')
});

module.exports = router;