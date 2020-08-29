const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('./db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });
users.createIndex('email');

router.post('/signup', (req, res, next) => {
    users.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            const error = new Error('That Username is already in use');
            next(error);
        } else {
            users.findOne({ email: req.body.email }).then((user) => {
                if (user) {
                    const error = new Error('That email is already in use');
                    next(error);
                } else {
                    bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
                        if (err) {
                            next(err);
                        } else {
                            const user = {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPassword
                            }
                            users.insert(user).then((insertedUser) => {
                                res.json(insertedUser);
                            });
                        }
                    });
                }
            });
        }
    });
});

function loginError(res, next) {
    res.status(400)
    const error = new Error('Unable to Login, Invalid Username or Password');
    next(error);
}

router.post('/login', (req, res, next) => {
    users.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            console.log(req.body.password, user.password);
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.log(err);
                } else if (result) {
                    res.json('Someone log this man in');
                } else {
                    loginError(res, next);
                }
            });
        } else {
            loginError(res, next);
        }
    });
});

module.exports = router;