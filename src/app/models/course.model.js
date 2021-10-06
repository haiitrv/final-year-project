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

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    user: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],

    materials: [{
        type: mongoose.Types.ObjectId,
        ref: 'material'
    }],

    assignments: [{
        type: mongoose.Types.ObjectId,
        ref: 'assignment'
    }]

}, {
    timestamps: true
})

const Course = mongoose.model('course', CourseSchema)

module.exports = Course