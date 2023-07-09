const { default: mongoose } = require("mongoose");
const User = require("../Models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'uisdf@()ndslnd9*&ndascpozpa'

const Login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).lean()
    
    if (!user) {
        return res.json({ status: 'error', error_message: 'Invalid username/password'})
    }

    if (await bcrypt.compare(password, user.password)) {
        //Username and password combination is successful
        
        const token = jwt.sign({ id: user._id, username:user.username }, JWT_SECRET)

        return res.json({
            status: 'ok',
            message: 'Login successfully',
            data: token
        })
    }

    return res.json({ status: 'error', error_message: 'Invalid username' })

    /*let result = database.filter(
        (user) => user.username === username && user.password === password
    );
    //👇🏻 user doesn't exist
    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    //👇🏻 user exists
    res.json({
        message: "Login successfully",
        data: {
            _id: result[0].id,
            _email: result[0].email,
        },
    });*/
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
    Login,
    Register
}