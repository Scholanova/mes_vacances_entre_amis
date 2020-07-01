var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' })   
});

module.exports = router;
