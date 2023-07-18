const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    _id: String,
    title: {
        type: String,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    allDay: Boolean,
    user_id: {
        type: String,
    }
}, {timestamps: true}, { _id: false });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;