const { roles } = require('../utils/constants')

// Middleware for checking the permission 
// If the user is not logged in as aad
// -> They don't have permission

function ensureCourse (req, res, next) {
    if (req.user.role === roles.aad || req.user.role === roles.teacher || req.user.role === roles.student) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

module.exports = { ensureCourse }