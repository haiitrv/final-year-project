const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    
    message: {
        type: String
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, {
    timestamps: true
})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment