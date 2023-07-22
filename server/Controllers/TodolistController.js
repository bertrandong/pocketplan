const { default: mongoose } = require("mongoose");
const Task = require("../Models/Task");
const jwt = require('jsonwebtoken')

const createTask = async (req, res) => {
    const { taskName, description, date, token } = req.body

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const user_id = user.id
        const task = await Task.create({taskName, description, date, user_id})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getTasks = async (req, res) => {
    const { token } = req.body
    const user = jwt.verify(token, process.env.JWT_SECRET)
    const user_id = user.id
    const tasks = await Task.find({user_id: user_id})

    res.status(200).json(tasks)
}

const deleteTask = async (req, res) => {
    const { id } = req.params

    const task = await Task.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

const updateTask = async (req, res) => {
    /*const { taskName, description, date } = req.body*/
    const { id } = req.params

    try {
        const task = await Task.findOneAndUpdate({_id: id}, req.body, {new: true})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createTask,
    getTasks,
    deleteTask,
    updateTask
}