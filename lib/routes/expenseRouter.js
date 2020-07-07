const Joi = require('@hapi/joi');
const expenseRepository = require('../repositories/expenseRepository');
const participantRepository = require('../repositories/participantRepository');
const expenseService = require('../services/expenseService');
const router = require('express').Router()


/* GET expense page. */
router.get('/event/:eventid', async function(req, res, next) {
    let expenses = await expenseService.getByEventIdWithTotalAmount(req.params.eventid)
    console.log('coucou')
    console.log(expenses)
    res.render('expense/list', { expenses })
});

module.exports = router;