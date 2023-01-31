const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
})

module.exports = ingredientSchema