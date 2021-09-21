const mongoose = require('mongoose')
const Course = require('../models/course.model')
const User = require('../models/user.model')


class CourseController {

    async getCourses(req, res, next) {
        try {
            // const courses = await Course.find()
            // res.render('course/course', { courses })
            const n_courses = await Course.estimatedDocumentCount()

            Course.find()
                  .populate('createdBy')
                  .then(courses => {
                      res.render('course/course', { courses, n_courses })
                  })

        } catch (error) {
            next(error)
        }
    }

    async getSpeCrs(req, res, next) {
        try {
            const { id } = req.params
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('back')
                return
            }
            const crs = await Course.findById(id)

            res.render('course/spe_course', { crs })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new CourseController