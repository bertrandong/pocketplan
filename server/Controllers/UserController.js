const { default: mongoose } = require("mongoose");
const User = require("../Models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
    const { token } = req.body
    
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const user_name = user.username
        res.status(200).json(user_name)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const Login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).lean()
    
    if (!user) {
        return res.json({ status: 'error', error_message: 'Invalid username/password'})
    }

    if (await bcrypt.compare(password, user.password)) {
        //Username and password combination is successful
        
        const token = jwt.sign({ id: user._id, username:user.username }, process.env.JWT_SECRET)

        return res.json({
            status: 'ok',
            message: 'Login successfully',
            data: token
        })
    }

    return res.json({ status: 'error', error_message: 'Invalid username' })

}

const Register = async (req, res) => {
    const { username, email, password: plainTextPassword } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({ status:'error', error_message: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status:'error', error_message: 'Invalid password' })
    }

    if (plainTextPassword.length < 8) {
        return res.json({
            status: 'error',
            error_message: 'Password too small. Should be at least 8 characters'
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            username,
            email,
            password
        })
        return res.json({ message: "Account created successfully!" });
    } catch (error) {
        if(error.code === 11000) {
            // Duplicate key
            return res.json({ status: 'error', error_message: 'Username already in use'})
        }
        throw error
    }
}

module.exports = {
    getUser,
    Login,
    Register
}