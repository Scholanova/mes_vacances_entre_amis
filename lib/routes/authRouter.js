const Joi = require('@hapi/joi')
const router = require('express').Router()
const authService = require('../services/authService')
const { ResourceNotFoundError } = require('../errors')


/* GET login page. */
router.get('/signin', async (req, res, next) => {
    return res.render('auth/signin', { title: 'Vacances entre amis' })
})

/* POST login page. */
router.post('/signin', async (req, res, next) => {
    let signinData = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        let session = await authService.login(signinData)
        res.cookie('sessionCookie', session.token)
        res.redirect('/events')
    } catch ( error ) {
        if (error instanceof Joi.ValidationError) {
            res.render('auth/signin', {
                title: 'Vacances Entre amis',
                values: signinData,
                failedFields: error.details
            })
        } else if ( error === 'USER_NOT_EXIST' || error === 'WRONG_PASSWORD' || error instanceof ResourceNotFoundError ) {
			res.render('auth/signin', {
                title: 'Vacances Entre amis',
                values: signinData,
				failedFields: error.details,
				error: 'Votre email ou mot de passe est invalide.'
            })
		 } else {
            next(error)
        }
    }
})

/* GET inscription page. */
router.get('/signup', async (req, res, next) => {
    return res.render('auth/signup')
})

/* POST inscription page. */
router.post('/signup', async (req, res, next) => {
    const userData = {
        pseudo: req.body['pseudo'],
        email: req.body['email'],
        password: req.body['password']
    }

    try {
        let user = authService.create(userData)
        return  res.redirect(`/auth/signin`)
    } catch ( error ) {
        if (error instanceof Joi.ValidationError) {
            return res.render('auth/singup', {
                values: userData,
                failedFields: error.details
            })
        } else {
            next(error)
        }
    }
})

module.exports = router