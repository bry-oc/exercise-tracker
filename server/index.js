const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const formidable = require("formidable");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();

// parsing json
app.use(express.json());
// parsing url-encoded
app.use(express.urlencoded({ extended: true }));

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
    console.log("Connection Successful!");
})

const exerciseSchema = new mongoose.Schema({
    description: { type: String },
    duration: { type: String },
    date: { type: Date }
});

const userSchema = new mongoose.Schema({
    username: { type: String },
    exercises: [Object]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});

//create a new user
app.post('/api/users', (req, res) => {
    const username = req.body.username;
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return console.error(err);
        } else if (user) {
            //if the user already exists, return it
            console.log("user exists");
            return res.json({ username: username, _id: user._id });
        } else {
            //the username is not taken > create a new user
            console.log("creating new user");
            const newUser = new User({ username: username });
            newUser.save(function (err, user) {
                if (err) {
                    return console.error(err);
                } else {
                    return res.json({ username: user.username, _id: user._id });
                }
            })
        }
    })
});

//get all users
app.get('/api/users', (req, res) => {
    User.find({}, { username: 1 }, { _id: 1 }, function (err, users) {
        if (err) {
            return console.error(err);
        } else {
            return res.json(users)
        }
    })
});

//post request to /api/users/:_id/exercises
//form data: description, duration, optional data
//no date provided => use current date
//return user with exercises
app.post('/api/users/:_id/exercises', (req, res, next) => {
    const userId = req.params._id;

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const description = fields.description;
        const duration = fields.duration;
        let date = fields.date;
        if (date === undefined) {
            console.log("undefined");
            date = new Date();
            date = date.toString();
            date = date.slice(0, 15);
        } else {
            date = new Date(date);
            date = date.toString();
            date = date.slice(0, 15);
        }
        const newExercise = { description: description, duration: duration, date: date };
        User.findById({ _id: userId }, function (err, user) {
            if (err) {
                return console.error(err);
            } else if (user) {
                user.exercises.push(newExercise);
                user.save(function (err, data) {
                    if (err) {
                        return console.error(err);
                    } else {
                        return res.json({ _id: user._id, username: user.username, date: date, duration: duration, description: description });
                    }
                });
            } else {
                return res.json({ error: "User was not found." })
            }
        });
    });

    /*
    const description = req.body.description;
    const duration = req.body.duration;
    let date = req.body.date;

    if (date === undefined) {
        console.log("undefined");
        date = new Date();
        date = date.toString();
        date = date.slice(0, 15);
    } else {
        date = new Date(date);
        date = date.toString();
        date = date.slice(0, 15);
    }
    const newExercise = { description: description, duration: duration, date: date };
    User.findById({ _id: userId }, function (err, user) {
        if (err) {
            return console.error(err);
        } else if (user) {
            user.exercises.push(newExercise);
            user.save(function (err, data) {
                if (err) {
                    return console.error(err);
                } else {
                    return res.json({ _id: user._id, username: user.username, date: date, duration: duration, description: description });
                }
            });
        } else {
            return res.json({ error: "User was not found." })
        }
    });
    */
});

app.post('/api/testForms', (req, res) => {

});


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});