const User = require('../models/user.model')
const mongoose = require('mongoose')
const { roles } = require('../../utils/constants')
const { body, validationResult } = require('express-validator')



class AdminController {

    // [GET] users
    async getUser(req, res, next) {
        try {
            // Find all users
            const users = await User.find()
            res.render('manage_users', { users })

        } catch (error) {
            next(error)
        }
    }

    // [GET] users profile
    async getProfile(req, res, next) {
        try {
            const { id } = req.params
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('/admin/users')
                return
            }
            // Get user from this ID
            const person = await User.findById(id)
            res.render('profile', { person })
        } catch (error) {
            next(error)
        }
    }

    // [POST] update roles
    async updateRole(req, res, next) {
        const { id, role } = req.body
        // Check whether id and role exists or not
        if (!id || !role) {
            req.flash('error', 'The request cannot be performed!')
            return res.redirect('back') // back to the page
        }
        // Check whether the objectID is valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid ID')
            return res.redirect('back')
        }
        // Check whether the role is valid or not
        const rolesArray = Object.values(roles)
        if (!rolesArray.includes(role)) {
            req.flash('error', 'Invalid Role')
            return res.redirect('back')
        }
        // Cannot remove admin
        if (req.user.id === id) {
            req.flash('error', 'Admin cannot be removed...!')
            return res.redirect('back')
        }
        // Update users
        const user = await User.findByIdAndUpdate(
            id,
            { role: role },
            { new: true, runValidators: true } // runValidators -> check documents is saved in collections (enum array)
        )

        req.flash('info', `${user.email}'s role has been updated successfully!`)
        res.redirect('/admin/users')
    }

    // [GET] Add new users
    async add(req, res, next) {
        res.render('add_users')
    }

    // [POST] Add new users
    async addUser(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach((error) => {
                    req.flash('error', error.msg)
                })
                res.render('add_users', {
                    email: req.body.email,
                    messages: req.flash(),
                })
                return
            }

            const { email } = req.body
            const doesExist = await User.findOne({ email })
            if (doesExist) {
                req.flash('warning', 'This email has already existed! Try another email!')
                res.redirect('/admin/add')
                return
            }
            const user = new User(req.body);
            await user.save();
            req.flash('success',`${user.email} has been registered succesfully!`)
            res.redirect('/auth/login')
        } catch (error) {
            next(error)
        }

    }

}

module.exports = new AdminController