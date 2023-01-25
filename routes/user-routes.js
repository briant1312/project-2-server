const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/user')
const { createUserToken } = require('../config/auth')

// SIGN UP
router.post('/sign-up', (req, res, next) => {
	bcrypt
		.hash(req.body.credentials.password, 10)
		.then((hash) =>
			({
				userName: req.body.credentials.userName,
				password: hash,
			})
		)
		.then((user) => User.create(user))
		.then((user) => res.status(201).json(user))
		.catch(next)
})

// SIGN IN
router.post('/sign-in', (req, res, next) => {
	User.findOne({ userName: req.body.credentials.userName })
		// Pass the user and the request to createUserToken
		.then((user) => createUserToken(req, user))
		// createUserToken will either throw an error that
		// will be caught by our error handler or send back
		// a token that we'll in turn send to the client.
		.then((token) => res.json({ token }))
		.catch(next)
});

module.exports = router
