const { default: mongoose } = require("mongoose");
const Event = require("../Models/Event");
const jwt = require('jsonwebtoken')

const createEvent = async (req, res) => {

    const {_id, title, start, end, allDay, token} = req.body

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const user_id = user.id
        const event = await Event.create({_id, title, start, end, allDay, user_id})
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getEvents = async (req, res) => {
    const { token } = req.body
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const user_id = user.id
    const events = await Event.find({user_id: user_id})

    res.status(200).json(events)
}

const getEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.find({_id:id})

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}

const deleteEvent = async (req, res) => {
    const { id } = req.params

    const event = await Event.findOneAndDelete({_id: id})

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}

const deleteAll = async (req, res) => {
    const { id } = req.params

    const event = await Event.deleteMany()

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}

const updateEvent = async (req, res) => {
    const { id } = req.params

    try {
        const event = await Event.findOneAndUpdate({_id: id}, req.body, {new: true})
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const uploadNewEvents = async (req, res) => {
    db.collection('events')
        .insertMany(req.body)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json({err: 'Could not upload'})
        })
}

module.exports = {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
    uploadNewEvents,
    deleteAll
}