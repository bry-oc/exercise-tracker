const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;

const app =  express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static(path.resolve(__dirname, '../client/build')));

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

const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.json({message: "Hello World!"});
});

//create a new user
app.post('/api/users', (req, res) => {
    const username = req.body.username;
    User.findOne({username: username}, function(err, user){
        if(err){
            return console.error(err);
        } else if (user) {
            //if the user already exists, return it
            console.log("user exists");
            return res.json({username: username, _id: user._id});
        } else {
            //the username is not taken > create a new user
            console.log("creating new user");
            const newUser = new User({username: username});
            newUser.save(function(err, user){
                if(err){
                    return console.error(err);
                } else {
                    return res.json({username: user.username, _id: user._id});
                }
            })
        }
    })
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});