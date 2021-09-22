const mongoose = require('mongoose')
const Course = require('../models/course.model')
const User = require('../models/user.model')
const Material = require('../models/material.model')


class CourseController {

    // [GET] all courses
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

    // [GET] get specific course
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

    // [GET] get the form to create new materials
    async getCreateMaterials(req, res, next) {
        // try {
        //     const { courseID } = req.params
        //     console.log(courseID)
        //     // if (!mongoose.Types.ObjectId.isValid(courseID)) {
        //     //     req.flash('error', 'Invalid ID!!!')
        //     //     res.redirect('back')
        //     //     return
        //     // }
        //     // const course = await Course.findById(courseID)
        //     // res.render('material/add_material', { course })
        // } catch (error) {
        //     next(error)
        // }
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid ID!!!')
            res.redirect('back')
            return
        }
        const course = await Course.findById(id)
        res.render('material/add_material', { course })

    }

    // [POST] create new materials
    async postCreateMaterials(req, res, next) {
        const { courseID } = req.params
        // Create new materials
        const { name, description } = req.body
        const newMaterial = new Material({
            name,
            description
        })
        // // Save course
        req.flash('success', `${newMaterial.name} has been created successfully!`)
        res.redirect('back')

    }

    // [GET] all materials
    async getMaterials(req, res, next) {

        const material = await Material.find()
        const course = await Course.find()

        res.render('material/material', { material , course })

    } 

    // [GET] get specific materials
    async getSpeMaterials(req, res, next) {
        try {
            const { id } = req.params
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('back')
                return
            }
            const mtr = await Material.findById(id)

            res.render('material/spe_material', { mtr })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController