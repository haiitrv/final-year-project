const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
    name: {
        type: String
    },

    description: {
        type: String
    },

    cloudinary_url: {
        type: String,
    },

    cloudinary_id: {
        type: String,
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },

    uploadedWork: [{
        type: mongoose.Types.ObjectId,
        ref: 'uploaded'
    }],

    setDeadlineDate: {
        type: Date,
        required: true,
    },

    setDueDate: {
        type: Date,
        required: true,
    }

}, {
    timestamps: true
})

const Assignment = mongoose.model('assignment', AssignmentSchema)

module.exports = Assignment