// Import packages
const express = require('express')
const createHttpError = require('http-errors')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const connectFlash = require('connect-flash')
const passport = require('passport')
const connectMongo = require('connect-mongo')
const connectEnsureLogin = require('connect-ensure-login')
const multer = require('multer')
const methodOverride = require('method-override')
require('dotenv').config()


// Initialize app
const app = express()
app.use(morgan('dev'))

// View Engines
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'resources', 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Delete Method
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


// Initialize session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    },
    store: connectMongo.create({
        mongoUrl: process.env.MONGO_URL
    })
}))

// Initialize passport (Passport must be initialized after session)
app.use(passport.initialize())
app.use(passport.session())
require('./utils/passport')

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

// Connect-flash
app.use(connectFlash())
app.use((req, res, next) => {
    res.locals.messages = req.flash()
    next()
})


// Routes
const route = require('./routes/index.route')


// Routes initial
route(app)

// Error Handler
app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((error, req, res, next) => {
    error.status = error.status || 500
    res.status(error.status)
    res.render('error_page', { error })
})

// PORT & MongoDB Connection
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database is connected...!')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}).catch(err => console.log(err.message))


