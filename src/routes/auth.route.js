const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/auth.controller')
const User = require('../app/models/user.model')
const { body, validationResult } = require('express-validator')
const { registerValidator } = require('../utils/validator')
const passport = require('passport')
// const { ensureAuth } = require('../middleware/ensureAuth')
// const { ensureNotAuth } = require('../middleware/ensureNotAuth')
const { ensureLoggedOut, ensureLoggedIn }= require('connect-ensure-login')

router.get('/login', ensureLoggedOut({ redirectTo: '/' }), authController.loginGet)
// router.get('/register', ensureLoggedOut({ redirectTo: '/' }), authController.registerGet)
router.get('/logout', ensureLoggedIn({ redirectTo: '/' }), authController.logOut)
router.post('/login', ensureLoggedOut({ redirectTo: '/' }), passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}))
// router.post('/register', ensureLoggedOut({ redirectTo: '/' }), registerValidator, authController.register)

module.exports = router
