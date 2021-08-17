const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../app/models/user.model')


passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email })
            // Email does not exist
            if (!user) {
                return done(null, false, { message: "This email has not been registered...!" })
            }
            // Email exists -> then verify password
            const isMatch = await user.isValidPassword(password)

            return isMatch ? done(null, user) : done(null, false, { message: "Invalid password!" })

        } catch (error) {
            done(error)
        }
    })
)

/* Serialize 
-> Setting the user id inside the session
-> Session create the cookie */

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

/* Deserialize
-> From the cookie to find the session
-> If session exists -> call user */

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})