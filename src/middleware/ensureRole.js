const { roles } = require('../utils/constants')

// Middleware for checking the permission 
// If the user is not logged in properly
// -> They don't have permission


// AAD
function ensureAad (req, res, next) {
    if (req.user.role === roles.aad) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

// ADMIN
function ensureAdmin (req, res, next) {
    if (req.user.role === roles.admin) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

// STUDENT
function ensureStudent (req, res, next) {
    if (req.user.role === roles.student) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

//TEACHER
function ensureTeacher (req, res, next) {
    if (req.user.role === roles.teacher) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

// View course
function ensureCourse (req, res, next) {
    if (req.user.role === roles.aad || req.user.role === roles.teacher || req.user.role === roles.student) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

// View specific course
function ensureSpeCrs (req, res, next) {
    if (req.user.role === roles.teacher || req.user.role === roles.student) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

// Upload material
function ensureUploadMat (req, res, next) {
    if (req.user.role === roles.teacher) {
        next()
    } else {
        req.flash('warning', 'You do not have this permission!')
        res.redirect('/')
    }
}

module.exports = { ensureAad, ensureAdmin, ensureStudent, ensureTeacher, ensureCourse, ensureSpeCrs, ensureUploadMat }