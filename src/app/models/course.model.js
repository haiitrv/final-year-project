const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },

    description: {
        type: String,
        maxLengh: 600,
    },
}, {
    timestamps: true
})

const Course = mongoose.model('course', CourseSchema)

module.exports = Course