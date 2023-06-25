const { default: mongoose } = require("mongoose");
const Event = require("../Models/Event");

const createEvent = async (req, res) => {

    const {_id, title, start, end, allDay} = req.body

    try{
        const event = await Event.create({_id, title, start, end, allDay})
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getEvents = async (req, res) => {
    const events = await Event.find({})

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
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