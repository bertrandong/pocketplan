const express = require('express')
const { createTask, getTasks, deleteTask, updateTask } = require('../Controllers/TodolistController')

const router = express.Router()

router.post('/getTasks', getTasks)

router.post('/createTask', createTask)

router.delete('/:id', deleteTask)

router.patch('/:id', updateTask)

module.exports = router