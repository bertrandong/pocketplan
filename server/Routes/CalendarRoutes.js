const express = require('express')
const {createEvent, getEvents, getEvent, deleteEvent, updateEvent, uploadNewEvents, deleteAll} = require('../Controllers/CalendarController')

const router = express.Router()

router.post('/createEvent', createEvent)

//GET all events
router.post('/', getEvents)

//GET an event
router.get('/:id', getEvent)

//DELETE all events
router.delete('/:id', deleteEvent)

//CHANGE an event
router.patch('/:id', updateEvent)

//UPLOAD new events
router.post('/uploadNewEvents', uploadNewEvents)

//DELETE all
router.delete('/delete', deleteAll)

module.exports = router