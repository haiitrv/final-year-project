const { roles } = require('../utils/constants')

// Middleware for checking the permission 
// If the user is not logged in as admin
// -> They don't have permission

function ensureAdmin (req, res, next) {
    if (req.user.role === roles.admin) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

module.exports = { ensureAdmin }