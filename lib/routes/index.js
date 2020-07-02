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
        return res.render('error', { title: 'Erreur', message:"veuillez écrire un mail correctement svp et le mot de passe doit être renseigné.", error: {status: "Erreur Utilisateur veuillez reessayer." } });
    }
})

router.get('/event', function(req, res, next){
    res.render('event')
})
module.exports = router;
