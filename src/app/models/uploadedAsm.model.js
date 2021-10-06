const mongoose = require('mongoose')

const UploadedSchema = new mongoose.Schema({
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

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    assignments: {
        type: mongoose.Types.ObjectId,
        ref: 'assignment'
    },

    comment: [{
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    }],

    grade: {
        type: String,
        enum: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        default: '0'
    }

}, {
    timestamps: true
})

const Uploaded = mongoose.model('uploaded', UploadedSchema)

module.exports = Uploaded