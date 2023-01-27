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
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next)
});

module.exports = router
