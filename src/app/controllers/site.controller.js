const mongoose = require('mongoose')
const Course = require('../models/course.model')
const User = require('../models/user.model')

class SiteController {

    async index(req, res, next) {

        const courses = await Course.find()

        res.render('site', { courses })

        // Course.find()
        //     .populate('category')
        //     .then(courses => {
        //     res.render('site', { courses })
        // })

    }

}



module.exports = new SiteController