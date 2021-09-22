const mongoose = require('mongoose')

const MaterialSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    description: {
        type: String,
    },

    // course_material: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'course'
    // }
}, {
    timestamps: true
})

const Material = mongoose.model('material', MaterialSchema)

module.exports = Material