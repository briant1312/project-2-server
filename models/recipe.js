const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSchema = require('./ingredient')

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    steps: [{
        type: String,
        require: true
    }],
    ingredients: [{
        type: ingredientSchema,
        required: true
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe