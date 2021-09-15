const siteRouter = require('./site.route')
const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const adminRouter = require('./admin.route')
const aadRouter = require('./aad.route')
const courseRouter = require('./course.route')

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const { ensureAdmin } = require('../middleware/ensureAdmin')
const { ensureAad } = require('../middleware/ensureAad')
const { ensureTeacher } = require('../middleware/ensureTeacher')
const { ensureStudent } = require('../middleware/ensureStudent')
const { ensureCourse } = require('../middleware/ensureCourse')

function route(app) {

    app.use('/', siteRouter)

    app.use('/auth', authRouter)

    app.use('/course', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureCourse, courseRouter)

    app.use('/user', ensureLoggedIn({ redirectTo: '/auth/login' }), userRouter)

    app.use('/admin', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, adminRouter)

    app.use('/aad', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAad, aadRouter)


}

module.exports = route