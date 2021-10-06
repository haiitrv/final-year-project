const mongoose = require('mongoose')
const User = require('../models/user.model')
const Course = require('../models/course.model')
const { roles } = require('../../utils/constants')
const { name } = require('ejs')


class AadController {


    // [GET] add new categories
    async add(req, res, next) {
        User.find({ role: 'AAD' }).then(usr => {
            res.render('course/add_course', { users: usr })
        })
    }
    // [POST] add new courses
    async addCourse(req, res, next) {
        try {
            const { name, description } = req.body

            const newCourse = await new Course({
                name,
                description,
                createdBy: req.body.user
            }).save()

            req.flash('success', `${newCourse.name} has been created successfully!`)
            res.redirect('back')

        } catch (error) {
            next(error)
        }
    }

    // [GET] get assign form
    async getAssign(req, res, next) {
        const course = await Course.find()
        const usr = await User.find({ role: ['STUDENT', 'TEACHER'] }).populate('course', 'name')
        res.render('assign/assign', { users: usr, course })
    }

    // [POST] post assign
    async postAssign(req, res, next) {
        // const { id, course } = req.body
        const {id, course} = req.body
        const user = await User.findByIdAndUpdate(
            id,
            { course: course},
            {new: true, runValidators: true}
        )
        req.flash('info', `${user.name} has been assigned successfully!`)
        res.redirect('back')
    }
}

module.exports = new AadController