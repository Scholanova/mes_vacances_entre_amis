const Joi = require('@hapi/joi');
const expenseRepository = require('../repositories/expenseRepository');
const router = require('express').Router()


/* GET expense page. */
router.get('/event/:eventid', function(req, res, next) {
    
    expenseRepository.getAllByEventId(req.params.eventid).then((expenses) => {
        console.log(expenses)
        res.render('expense/list', { expenses })
    })
    .catch(next)
});

module.exports = router;