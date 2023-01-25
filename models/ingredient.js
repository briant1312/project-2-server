const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
        enum: ['vegetable', 'grain', 'fruit', 'dairy', 'protein', 'spice', 'other']
    },
    qty: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
})

module.exports = ingredientSchema