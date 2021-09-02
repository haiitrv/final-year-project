const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },

    description: {
        type: String,
        maxLengh: 600,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Category = mongoose.model('category', CategorySchema)

module.exports = Category