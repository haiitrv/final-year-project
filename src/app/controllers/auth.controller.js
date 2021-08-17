const User = require("../models/user.model")
const { body, validationResult } = require('express-validator')


class AuthController {

    // [GET] method

    async loginGet(req, res, next) {
        res.render('login')
    }

    // async registerGet(req, res, next) {
    //     res.render('register')
    // }

    async logOut(req, res, next) {
        req.logOut()
        res.redirect('/')
    }

    // [POST] method

    // async register(req, res, next) {
    //     try {
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty()) {
    //           errors.array().forEach((error) => {
    //             req.flash('error', error.msg)
    //           })
    //           res.render('register', {
    //             email: req.body.email,
    //             messages: req.flash(),
    //           })
    //           return
    //         }
      
    //         const { email } = req.body
    //         const doesExist = await User.findOne({ email })
    //         if (doesExist) {
    //           req.flash('warning', 'This email has already existed! Try another email!')
    //           res.redirect('/auth/register')
    //           return
    //         }
    //         const user = new User(req.body);
    //         await user.save();
    //         req.flash(
    //           'success',
    //           `${user.email} has been registered succesfully!`
    //         )
    //         res.redirect('/auth/login')
    //       } catch (error) {
    //         next(error)
    //       }
    // }
}

module.exports = new AuthController