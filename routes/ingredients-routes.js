const express = require('express')

const Recipe = require('../models/recipe')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom-errors')

const router = express.Router()

// CREATE
router.post('/ingredients/:recipeId', requireToken, (req, res, next) => {
    const { recipeId } = req.params
    Recipe.findById(recipeId)
        .then(handle404)
        .then(recipe => {
            recipe.ingredients.push(req.body.ingredient)
            return recipe.save()
        })
        .then(recipe => res.json({ recipe }))
        .catch(next)
})

//DELETE
router.delete('/ingredients/:recipeId', requireToken, (req, res, next) => {
    const { recipeId }  = req.params
    Recipe.findById(recipeId)
        .then(handle404)
        .then(recipe => {
            recipe.ingredients.pull(req.body.ingredientId)
            return recipe.save()
        })
        .then(recipe => res.json({ recipe }))
        .catch(next)
})

module.exports = router