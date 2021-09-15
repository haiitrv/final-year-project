const mongoose = require('mongoose')
const User = require('../models/user.model')
const Course = require('../models/course.model')


class AadController {


    // [GET] add new categories
    async add(req, res, next) {
        res.render('course/add_course')
    }
    // [POST] add new categories
    async addCat(req, res, next) {
        const course = new Course(req.body)
        await course.save()
        req.flash('success', `${course.name} has been created successfully!`)
        res.redirect('back')
    } catch(error) {
        next(error)
    }


}

module.exports = new AadController