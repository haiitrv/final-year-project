const mongoose = require('mongoose')
const User = require('../models/user.model')
const Course = require('../models/course.model')
const { roles } = require('../../utils/constants')


class AadController {


    // [GET] add new categories
    async add(req, res, next) {
        User.find({ role: 'AAD' }).then(usr => {
            res.render('course/add_course', { users: usr })
        })
    }
    // [POST] add new courses
    async addCourse(req, res, next) {
        const { name, description } = req.body

        const newCourse = await new Course({
            name,
            description,
            createdBy: req.body.user
        }).save()

        req.flash('success', `${newCourse.name} has been created successfully!`)
        res.redirect('back')

    } catch(error) {
        next(error)
    }


}

module.exports = new AadController