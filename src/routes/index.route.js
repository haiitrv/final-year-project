const siteRouter = require('./site.route')
const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const adminRouter = require('./admin.route')
// const { ensureAuth } = require('../middleware/ensureAuth')
// const { ensureNotAuth } = require('../middleware/ensureNotAuth')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const { ensureAdmin } = require('../middleware/ensureAdmin')

function route(app) {

    app.use('/', siteRouter)

    app.use('/auth', authRouter)

    app.use('/user', ensureLoggedIn({ redirectTo: '/auth/login' }), userRouter)

    app.use('/admin', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, adminRouter)

}

module.exports = route