var express = require('express');
var router = express.Router();
var models = require('../models');
const userService = require('../services/userService');

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' })
});

router.post('/login', function(req, res, next){
    if(req.body['email'].length > 0 && req.body['password'].length > 0 && userService.validateEmail(req.body['email']))
    {
        console.log(req.body['email'].length > 0 && req.body['password'].length > 0 && userService.validateEmail(req.body['email']))
        userService.login(req, res)
    }
    else
    {
        console.log("langage de merde")
        return res.render('error', { title: 'pute', error: {status: "400", message:"wesh t'es serieux tu sais pas écrire un mail ?"} });
    }
})
module.exports = router;
