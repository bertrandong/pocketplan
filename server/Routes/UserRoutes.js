const express = require('express')
const { getUser, Login, Register } = require('../Controllers/UserController')

const router = express.Router()

router.post('/getuser', getUser)

router.post('/login', Login)

router.post('/register', Register)

module.exports = router