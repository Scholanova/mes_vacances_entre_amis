const Joi = require('@hapi/joi');
const expenseRepository = require('../repositories/expenseRepository');
const participantRepository = require('../repositories/participantRepository');
const expenseService = require('../services/expenseService');
const router = require('express').Router()


/* GET expenses page. */
router.get('/event/:eventid', async function(req, res, next) {
    let expenses = await expenseService.getByEventIdWithTotalAmount(req.params.eventid)
    console.log('coucou')
    console.log(expenses)
    res.render('expense/list', { expenses })
});

router.get('/:id', async function(req, res, next) {
    let expense = await expenseService.getByIdWithTotalAndParticipant(req.params.id)
    console.log('test florian')
    
    console.log('coucou')
    console.log(expense)
    res.render('expense/detail', { expense })
})
module.exports = router;