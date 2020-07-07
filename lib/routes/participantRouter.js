const Joi = require('@hapi/joi')
const router = require('express').Router()
const eventService = require('../services/eventService')
const eventRepository = require('../repositories/eventRepository')
const expenseService = require('../services/expenseService')
const participantRepository = require('../repositories/participantRepository')
const userRepository = require('../repositories/userRepository')
const participantService = require('../services/participantService')

/* ADD participant. */
router.get('/:eventId/add', async function(req, res, next) {
    let eventId = req.params.eventId
    let event = await eventRepository.get(eventId)
    let users = await event.getUsers()

    return res.render('participant/newParticipant', {
        title: 'Ajouter un participant à un événement',
        event: event.get(),
        participants: users.map( user => user.get() )
    })
})

/* POST create participant. */
router.post('/:eventId/add', async function(req, res, next) {
    let eventId = req.params.eventId
    let event = await eventRepository.get(eventId)
    let users = await event.getUsers()

    let participantData = {
        eventId: eventId,
        userId: req.body.userId,
        participants: req.body.participants ? req.body.participants.map((participant, i) => ({ userId: participant})) : []
    }

    try {
        let participant = await participantService.create(participanteData)
        let user = await participantService.listAll()
        return res.redirect(`/participants`)
    } catch ( error ) {
        if (error instanceof Joi.ValidationError) {
            return res.render('participant/newParticipant', {
                title: 'Ajouter un Participant à l\'événement',
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