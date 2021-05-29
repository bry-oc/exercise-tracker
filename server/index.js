const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const app =  express();

mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
    console.log("Connection Successful!");
})

const exerciseSchema = new mongoose.Schema({
    description: {type: String},
    duration: {type: String},
    date: {type: Date}
});

const userSchema = new mongoose.Schema({
    username: {type: String},
    exercises: [exerciseSchema]
});

app.get('/', (req, res) => {
    res.json({message: "Hello World!"});
});

app.post('/api/users', (req, res) => {
    const user = req.body.username;

})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});