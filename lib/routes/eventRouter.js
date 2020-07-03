const Joi = require('@hapi/joi');
const eventRepository = require('../repositories/eventRepository');
var express = require('express'),
    router = express.Router();
    eventService = require('../services/eventService')


//* Return list of Events page 
router.get('/', function(req, res, next) {
    eventRepository.listAll()
    .then((events) => {
        res.render('events', { events })
    })
    .catch(next)
})

//* Return a creation Event page
router.get('/new', function(req, res, next) {
    return res.render('event/create', { title: 'Creation d\'Événement' })
})

//* Create a new Event
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

module.exports = router;