const express = require('express')

const Recipe = require('../models/recipe')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom-errors')

const router = express.Router()

// CREATE
router.post('/recipes', requireToken, (req, res, next) => {
	Recipe.create(req.body.recipe)
		.then((recipe) => {
			res.status(201).json({ recipe })
		})
		.catch(next)
})

// INDEX
router.get('/recipes/:userId', requireToken, (req, res, next) => {
	const { userId } = req.params
	Recipe.find({ user: userId })
		.then(handle404)
		.then((recipes) => {
			return recipes.map((recipe) => recipe)
		})
		.then((recipes) => res.status(200).json({ recipes }))
		.catch(next)
})

// SHOW
router.get('/recipes/show/:recipeId', requireToken, (req, res, next) => {
	const { recipeId } = req.params
	Recipe.findById(recipeId)
		.then(handle404)
		.then(recipe => {
			res.json({ recipe })
		})
		.catch(next)
})

// UPDATE
router.patch('/recipes/:recipeId', requireToken, (req, res, next) => {
	const { recipeId } = req.params
	Recipe.findById(recipeId)
		.then(handle404)
		.then(recipe => {
			return recipe.updateOne(req.body.recipe)
		})
		.then(res.sendStatus(204))
		.catch(next)
})

// DELETE
router.delete('/recipes/:recipeId', requireToken, (req, res, next) => {
	Recipe.findById(req.params.recipeId)
		.then(handle404)
		.then((recipe) => {
			recipe.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router