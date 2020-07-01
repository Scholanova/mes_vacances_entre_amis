var express = require('express');
var router = express.Router();
var models = require('../models');
const userService = require('../services/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' })    
    
    router.post('/login', function(req, res, next){
        console.log("langage de merde")
        userService.login(req, res)
        res.redirect('/events')
    })
});

module.exports = router;
