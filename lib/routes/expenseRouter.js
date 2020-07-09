const Joi = require('@hapi/joi');
const expenseRepository = require('../repositories/expenseRepository');
const participantRepository = require('../repositories/participantRepository');
const expenseService = require('../services/expenseService');
const router = require('express').Router()
const middlewares = require('../middlewares')


/* GET expenses page. */
router.get('/event/:eventid', 
	middlewares.authentificationRequired,	
	async function(req, res, next) {
		let expenses = await expenseService.getByEventIdWithTotalAmount(req.params.eventid)
		res.render('expense/list', { expenses })
	}
);

router.get('/:id', 
	middlewares.authentificationRequired,
	async function(req, res, next) {
		let expense = await expenseService.getByIdWithTotalAndParticipant(req.params.id)
		res.render('expense/detail', { expense })
	}
)

module.exports = router;