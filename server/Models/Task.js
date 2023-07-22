const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    taskName: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    user_id: {
        type: String,
    }
}, {timestamps: true});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;