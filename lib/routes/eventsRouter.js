var express = require('express');
const eventRepository = require('../repositories/eventRepository');
var router = express.Router();

/* GET events page. */
router.get('/', function(req, res, next) {
    eventRepository.listAll()
    .then((events) => {
        res.render('events', { events })
    })
    .catch(next)
})

module.exports = router;
