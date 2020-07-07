const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')
const router = require('express').Router()
const Joi = require('@hapi/joi')

router.get('/new', function (req, res, next) {
  res.render('users/new')
});

router.get('/login', function (req, res, next) {
  res.render('users/login')
});

// inscription user
router.post('/new', function (req, res, next) {
  const userData = {
    pseudo: req.body['pseudo'],
    email: req.body['email'],
    password: req.body['password']
  }
  return userService.create(userData)
       .then(() => {
          res.redirect(`/`)
        })
       .catch((error) => {
          if (error instanceof Joi.ValidationError) {
            res.render('users/new', {
              values: {
                pseudo: req.body['pseudo'],
                email: req.body['email'],
                password: req.body['password']
              },
              failedFields: error.details
            })
          } else {
            next(error)
          }
    })
   }) ;

//login
router.post('/login', function(req, res, next){
    if(req.body['email'].length > 0 && req.body['password'].length > 0 && userService.validateEmail(req.body['email']))
    {
        userService.login(req, res)
    }
    else
    {
        return res.render('error', { title: 'Erreur', message:"veuillez écrire un mail correctement svp et le mot de passe doit être renseigné.", error: {status: "Erreur Utilisateur veuillez reessayer." } });
    }
});

//evenement
router.get('/event', function(req, res, next){
    res.render('event/new')
});

router.post('/event', function(req, res, next){
    res.render('event/create')
})


module.exports = router
