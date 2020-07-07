const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi')
const eventService = require('../services/eventService')
const eventRepository = require('../repositories/eventRepository')
const expenseService = require('../services/expenseService')
const userRepository = require('../repositories/userRepository')
const sessionRepository = require('../repositories/sessionRepository')

//* ------------------- Event ------------------------ *//

/* GET list events page. */
router.get('/', async function(req, res, next) {
    var encryptedSessionCookie = req.cookies['sessionCookie'];
    var sessionObj = await sessionRepository.getByToken(encryptedSessionCookie);
    userRepository.getById(sessionObj.userId)
    .then((user) => {
        eventRepository.listByUser(user)
        .then((events) => {
            res.render('event/events', { events })
        })
        .catch(next)
    });
})

/* GET create event page. */
router.get('/new', function(req, res, next) {
    return res.render('event/create', { title: 'Creation d\'Événement' })
})

/* POST create expense. */
router.post('/new', function(req, res, next) {
    
    const eventData = {
        name: req.body.name,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        place: req.body.place
    }

    return eventService.create(eventData)
        .then(event => {
            res.redirect('/events')
        })
        .catch(error => {
            if (error instanceof Joi.ValidationError) {
                res.render('event/create', {
                    title: 'Creation d\'Événement',
                    values: eventData,
                    failedFields: error.details
                })
            } else {
                next(error)
            }
        })
})



//* ------------------- Expense ------------------------ *//

/* GET create expense page. */
router.get('/:eventId/expenses/new', async function(req, res, next) {
    let eventId = req.params.eventId

    let event = await eventRepository.get(eventId)
    let users = await event.getUsers()

    return res.render('expense/create', {
        title: 'Creation d\'une dépense',
        event: event.get(),
        participants: users.map( user => user.get() )
    })
})

/* POST create expense. */
router.post('/:eventId/expenses/new', async function(req, res, next) {
    let eventId = req.params.eventId
    let event = await eventRepository.get(eventId)
    let users = await event.getUsers()

    let expenseData = {
        eventId: eventId,
        name: req.body.name,
        participants: req.body.participants ? req.body.participants.map((participant, i) => ({ userId: participant, amount: req.body.amount[i] })) : []
    }

    try {
        let expense = await expenseService.create(expenseData)
        return res.redirect(`/events/${eventId}/expenses`)
    } catch ( error ) {
        if (error instanceof Joi.ValidationError) {
            return res.render('expense/create', {
                title: 'Creation d\'une dépense',
                event: event.get(),
                participants: users.map( user => user.get() ),
                failedFields: error.details
            })
        } else {
            return next(error)
        }
    }
})

module.exports = router;