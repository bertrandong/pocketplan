require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const PORT = 4000;

app.use(cors({origin: ['https://pocketplanner.vercel.app'], methods: ["POST", "GET", "DELETE", "PATCH"]}));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/calendar", require('./Routes/CalendarRoutes'));
app.use("/user", require('./Routes/UserRoutes'));
app.use("/api/todolist", require('./Routes/TodolistRoutes'))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })