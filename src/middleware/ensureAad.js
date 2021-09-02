const { roles } = require('../utils/constants')

// Middleware for checking the permission 
// If the user is not logged in as aad
// -> They don't have permission

function ensureAad (req, res, next) {
    if (req.user.role === roles.aad) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

module.exports = { ensureAad }