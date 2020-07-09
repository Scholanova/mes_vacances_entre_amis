const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi')
const eventService = require('../services/eventService')
const eventRepository = require('../repositories/eventRepository')
const expenseService = require('../services/expenseService')
const userRepository = require('../repositories/userRepository')
const sessionRepository = require('../repositories/sessionRepository')
const participantRepository = require('../repositories/participantRepository')
const participantService = require('../services/participantService')
const middlewares = require('../middlewares')


//* ------------------- Event ------------------------ *//

/* GET list events page. */
router.get('/', [
    middlewares.authentificationRequired,
    async function(req, res, next) {
        try {
            let events = await eventRepository.listByUser(req.user)
            return res.render('event/list', { events })
        } catch (error) {
            next(error);
        }
    }
])

/* GET create event page. */
router.get('/new', function(req, res, next) {
    return res.render('event/create', { title: 'Creation d\'Événement' })
})

/* POST create event. */
router.post('/new', [
    middlewares.authentificationRequired,
    async function(req, res, next) {
    
        const eventData = {
            name: req.body.name,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            place: req.body.place
        }
        return eventService.create(eventData)
        .then(event => {
            event.addUsers(req.user);
        })
        .then(() => {
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
    }
])

router.get('/:id', function (req, res, next) {
  const eventId = req.params.id

  eventRepository.get(eventId)
    .then((event) => {
      res.render('event/infos', { event })
    })
    .catch(next)
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

	if (typeof req.body.participants === 'string') {
		req.body.participants = [req.body.participants]
	}

	if (typeof req.body.amount === 'string') {
		req.body.amount = [req.body.amount]
	}

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


/* GET event's expenses. */
router.get('/:eventId/expenses', async function(req, res, next) {
	let expenses = await expenseService.getByEventIdWithTotalAmount(req.params.eventId)
	return res.render('expense/list', { expenses })
})

/* GET event's expense info. */
router.get('/:eventId/expenses/:expenseId', async function(req, res, next) {
	let expense = await expenseService.getByIdWithTotalAndParticipant(req.params.expenseId)
    return res.render('expense/infos', { expense })
})



//* ------------------- User Event ------------------------ *//

/* ADD participant. */
router.get('/:eventId/users/new', async function(req, res, next) {
    let eventId = req.params.eventId
    let event = await eventRepository.get(eventId)
   // let users = await event.getUsers()
    let users = await participantRepository.listAllUsers()

    return res.render('participant/newParticipant', {

        title: 'Ajouter un participant à un événement',
        event: event.get(),
        users: users.map( user => user.get() )
    })
})

/* POST create participant. */
router.post('/:eventId/users/new', async function(req, res, next) {
    let eventId = req.params.eventId
    let event = await eventRepository.get(eventId)
    let users = await participantRepository.listAllUsers()

    try {
        await event.addUsers(req.body.participants)
        return res.redirect(`/events/${event.id}`)
    } catch ( error ) {
        if (error instanceof Joi.ValidationError) {
            return res.render('participant/newParticipant', {
                title: 'Ajouter un Participant à l\'événement',
                event: event.get(),
                users: users.map( user => user.get() ),
                failedFields: error.details
            })
        } else {
            return next(error)
        }
    }
})

module.exports = router;