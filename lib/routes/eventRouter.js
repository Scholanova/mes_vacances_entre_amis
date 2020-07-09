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
const utils = require('../utils')
const expenseRepository = require('../repositories/expenseRepository')


//* ------------------- Event ------------------------ *//

/* GET list events page. */
router.get('/',
	middlewares.authentificationRequired,
	async function(req, res, next) {
		try {
			let events = await eventRepository.listByUser(req.user)
			let eventData = []
			
			for(let i = 0; i < events.length; i++) {
				let event = events[i]
				let data = { ...event.get() }
				
				data.nbUser = await event.countUsers()
				
				let total = 0
				let expenses = await event.getExpenses()
				
				for(let j = 0; j < expenses.length; j++) {
					let expense = expenses[j]
					let participants = await expense.getParticipants()
					total += participants.map( e => e.amount ).reduce((a, b) => a + b)
				}
				
				eventData.push({ 
					...events[i].get(), 
					nbUser: (await events[i].countUsers()),
					total: total
				})
			}
			
			return res.render('event/list', { events: eventData })
		} catch (error) {
			next(error);
		}
	}
)

/* GET create event page. */
router.get('/new', 
	middlewares.authentificationRequired,
	function(req, res, next) {
		return res.render('event/create', { title: 'Creation d\'Événement' })
	}
)

/* POST create event. */
router.post('/new', 
	middlewares.authentificationRequired,
	async function(req, res, next) {
		
		const eventData = {
			name: req.body.name,
			dateStart: req.body.dateStart,
			dateEnd: req.body.dateEnd,
			place: req.body.place
		}
		
		try {
			let event = await eventService.create(eventData)
			await event.addUsers(req.user)
			return res.redirect('/events')
		} catch ( error ) {
			if (error instanceof Joi.ValidationError) {
				res.render('event/create', {
					title: 'Creation d\'Événement',
					values: eventData,
					failedFields: error.details
				})
			} else {
				next(error)
			}
		}
	}
)

/* GET expense info. */
router.get('/:eventId',
	middlewares.authentificationRequired,
	async function (req, res, next) {
		try {
			let data = {}
			let event = await eventRepository.get(req.params.eventId)
			
			data.event = event.get()
			data.expenses = []
			
			let expenses = await event.getExpenses()
			
			for(let i = 0; i < expenses.length; i++) {
				let expense = expenses[i]
				let result = await utils.calculateExpense(expense)
				
				for(let k = 0; k < result.payements.length; k++) {
					result.payements[k].from = (await userRepository.getById(result.payements[k].from)).pseudo
					result.payements[k].to = (await userRepository.getById(result.payements[k].to)).pseudo
				}
				
				data.expenses.push({
					...expense.get(),
					...result
				})
				
			}
			
			let bilan = {}
			for (let i = 0; i < expenses.length; i++) {
				let expense = expenses[i];
				let result = await utils.calculateExpense(expense);
				for (let j = 0; j < result.payements.length; j++) {
					let payement = result.payements[j]
					
					if ( !bilan[payement.to] ) bilan[payement.to] = 0
					if ( !bilan[payement.from] ) bilan[payement.from] = 0
		
					bilan[payement.to] += payement.amount
					bilan[payement.from] -= payement.amount
				}
			}
			let newBilan = {}
			for (let i = 0; i < Object.keys(bilan).length; i++) {
				let key = Object.keys(bilan)[i];
				let user = await userRepository.getById(key);
				newBilan[user.pseudo] = bilan[key];
			}

			let items = Object.keys(newBilan).map(function(key) {
				return [key, newBilan[key]];
			});

			items.sort(function(first, second) {
				return second[1] - first[1];
			});
					
			data.newBilan = Object.fromEntries(items)

			return res.render('event/infos', data)
		} catch ( error ) {
			return next(error)
		}
	}
)




//* ------------------- Expense ------------------------ *//

/* GET create expense page. */
router.get('/:eventId/expenses/new', 
	middlewares.authentificationRequired,
	async function(req, res, next) {
		let eventId = req.params.eventId
		let event = await eventRepository.get(eventId)
		let users = await event.getUsers()
		
		return res.render('expense/create', {
			title: 'Creation d\'une dépense',
			event: event.get(),
			participants: users.map( user => user.get() )
		})
	}
)

/* POST create expense. */
router.post('/:eventId/expenses/new', 
	middlewares.authentificationRequired,
	async function(req, res, next) {
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
	}
)


/* GET event's expenses. */
router.get('/:eventId/expenses', 
	middlewares.authentificationRequired,
	async function(req, res, next) {
		let expenses = await expenseService.getByEventIdWithTotalAmount(req.params.eventId)
		return res.render('expense/list', { expenses, evid: req.params.eventId  })
	}
)

/* GET event's expense info. */
router.get('/:eventId/expenses/:expenseId', 
	middlewares.authentificationRequired, 
	async function(req, res, next) {
		let expense = await expenseService.getByIdWithTotalAndParticipant(req.params.expenseId)
		return res.render('expense/infos', { expense })
	}
)

router.get('/:eventId/expenses/:expenseId/delete',
	middlewares.authentificationRequired,
	async function(req, res, next) {
		try {
			await expenseRepository.delete(req.params.expenseId)
			return res.redirect(`/events/${req.params.eventId}/expenses`)
		} catch (error ) {
			return next(error)
		}
	}
)



//* ------------------- User Event ------------------------ *//

/* ADD participant. */
router.get('/:eventId/users/new', 
	middlewares.authentificationRequired,
	async function(req, res, next) {
		let eventId = req.params.eventId
		let event = await eventRepository.get(eventId)
		// let users = await event.getUsers()
		let users = await participantRepository.listAllUsers()
		
		return res.render('participant/newParticipant', {
			
			title: 'Ajouter un participant à un événement',
			event: event.get(),
			users: users.map( user => user.get() )
		})
	}
)

/* POST create participant. */
router.post('/:eventId/users/new', 
	middlewares.authentificationRequired,
	async function(req, res, next) {
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
	}
)

module.exports = router;