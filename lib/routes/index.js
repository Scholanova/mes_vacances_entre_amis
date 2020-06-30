var express = require('express');
var router = express.Router();
var models = require('../models')

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

});

module.exports = router;
