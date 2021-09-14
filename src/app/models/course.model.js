const mongoose = require('mongoose')
const Category = require('./category.model')

const CourseSchema = new mongoose.Schema({
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
    },

    cate: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    }

})

const Course = mongoose.model('course', CourseSchema)

module.exports = Course