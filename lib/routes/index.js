var express = require('express');
var router = express.Router();
var models = require('../models');
const userService = require('../services/userService');

/* GET home page. */
router.get('/', function(req, res, next) {

    const user = new models.User({
        pseudo: 'Pseudo',
        email: 'email',
        password: 'password'
    })
    user.save().then(() => {
    
        models.User.findAll()
            .then( users => {
                res.render('index', { title: 'title', users: users })
            })  
        })
    
    router.post('/login', function(req, res, next){
        console.log("langage de merde")
        userService.login(req, res)
        res.redirect('/events')
    })
});

module.exports = router;
