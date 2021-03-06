const mongoose = require('mongoose')

const MaterialSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    description: {
        type: String,
    },

    cloudinary_url: {
        type: String,
    },

    cloudinary_id: {
        type: String,
    },
    
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const Material = mongoose.model('material', MaterialSchema)

module.exports = Material