var express = require('express');
var router = express.Router();
var models = require('../models')


/* GET login page. */
router.get('/', function(req, res, next) {
    return res.redirect('/auth/signin')
});

module.exports = router;
