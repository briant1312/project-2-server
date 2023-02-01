const express = require('express')

const Recipe = require('../models/recipe')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom-errors')

const router = express.Router()

// CREATE
router.post('/recipes', requireToken, (req, res, next) => {
	const userId = req.user._id
	Recipe.create(req.body.recipe)
		.then((recipe) => {
			recipe.user = userId
			recipe.save()
			res.status(201).json({ recipe: recipe })
		})
		.catch(next)
})

// INDEX ALL RECIPES
router.get('/allRecipes', requireToken, (req, res, next) => {
	Recipe.find()
		.populate('user')
		.then(handle404)
		.then((recipes) => {
			return recipes.map((recipe) => recipe)
		})
		.then((recipes) => res.status(200).json({ recipes }))
		.catch(next)
})

// INDEX
router.get('/recipes', requireToken, (req, res, next) => {
	Recipe.find({ user: req.user._id })
		.populate('user')
		.then(handle404)
		.then((recipes) => {
			return recipes.map((recipe) => recipe)
		})
		.then((recipes) => res.status(200).json({ recipes }))
		.catch(next)
})

// SHOW
router.get('/recipes/:recipeId', requireToken, (req, res, next) => {
	const { recipeId } = req.params
	Recipe.findById(recipeId)
		.populate('user')
		.then(handle404)
		.then(recipe => {
			res.json({ recipe })
		})
		.catch(next)
})

// UPDATE
router.patch('/recipes/:recipeId', requireToken, (req, res, next) => {
	const { recipeId } = req.params
	Recipe.findOne({ _id: recipeId, user: req.user._id })
		.then(handle404)
		.then(recipe => {
			return recipe.updateOne(req.body.recipe)
		})
		.then(res.sendStatus(204))
		.catch(next)
})

// DELETE
router.delete('/recipes/:recipeId', requireToken, (req, res, next) => {
	const { recipeId } = req.params
	Recipe.findOne({ _id: recipeId, user: req.user._id })
		.then(handle404)
		.then((recipe) => {
			recipe.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router