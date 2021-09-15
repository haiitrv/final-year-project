const { roles } = require('../utils/constants')

// Middleware for checking the permission 
// If the user is not logged in as teacher
// -> They don't have permission

function ensureStudent (req, res, next) {
    if (req.user.role === roles.student) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

module.exports = { ensureStudent }