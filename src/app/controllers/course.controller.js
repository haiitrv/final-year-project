const mongoose = require('mongoose')
const Course = require('../models/course.model')
const User = require('../models/user.model')
const Material = require('../models/material.model')
const Assignment = require('../models/assignment.model')
const Uploaded = require('../models/uploadedAsm.model')

class CourseController {

    // [GET] all courses
    async getCourses(req, res, next) {
        try {
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
            const { courseID } = req.params
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(courseID)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('back')
                return
            }
            const crs = await Course.findById(courseID)
            const material = await Material.find()
            const assignment = await Assignment.find().populate('course')

            res.render('course/spe_course', { crs, material, assignment })
            // const { courseID } = req.params.courseID
            // // const { materialID } = req.params.materialID
            // // if (!mongoose.Types.ObjectId.isValid(courseID)) {
            // //     req.flash('error', 'Invalid ID!!!')
            // //     res.redirect('back')
            // //     return
            // // }
            // const crs = await Course.findById(courseID)
            // res.render('course/spe_course', { crs, mtr })
        } catch (error) {
            next(error)
        }
    }


    // [GET] get the form to create new materials
    async getCreateMaterials(req, res, next) {
        // const { id } = req.params
        const { courseID } = req.params // -> Xem lai
        if (!mongoose.Types.ObjectId.isValid(courseID)) {
            req.flash('error', 'Invalid ID!!!')
            res.redirect('back')
            return
        }
        const course = await Course.findById(courseID)
        res.render('material/add_material', { course })

    }

    // [GET] get specific materials
    async getSpeMaterials(req, res, next) {
        try {
            const materialID = req.params.materialID
            const courseID = req.params.courseID
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(materialID)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('back')
                return
            }
            const mtr = await Material.findById(materialID)
            const course = await Course.findById(courseID)

            res.render('material/spe_material', { mtr, course })
        } catch (error) {
            next(error)
        }
    }

    // [GET] get all materials

    async getMaterials(req, res, next) {
        const courseID = req.params.courseID
        const course =  await Course.findById(courseID).populate('materials')
        res.render('material/material', { materials: course.materials, course })
    }

    // [GET] get all assignments
    async getAllAssignments(req, res, next) {
        const courseID = req.params.courseID
        const course = await Course.findById(courseID).populate('assignments')
        res.render('assignment/assignment', { assignments: course.assignments, course })
    }

    // [GET] get create assignments
    async getCreateAssignments(req, res, next) {
        try {
            const courseID = req.params.courseID
            if (!mongoose.Types.ObjectId.isValid(courseID)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('back')
                return
            }
            const course = await Course.findById(courseID)
            res.render('assignment/add_assignment', { course })
        } catch (error) {
            next(error)
        }
    }

    // [GET] get specific assignments
    async getSpeAssignments(req, res, next) {
        try {
            const courseID = req.params.courseID
            const assignmentID = req.params.assignmentID
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(assignmentID)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('back')
                return
            }
            if (!mongoose.Types.ObjectId.isValid(courseID)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('back')
                return
            }
            const asm = await Assignment.findById(assignmentID)
            const course = await Course.findById(courseID)

            res.render('assignment/spe_assignment', { asm, course })
        } catch (error) {
            next(error)
        }
    }

    // [GET] get all works
    async getAllWorks(req, res, next) {
        const assignmentID = req.params.assignmentID
        const courseID = req.params.courseID
        const course = await Course.findById(courseID)
        const assignment = await Assignment.findById(assignmentID).populate('uploadedWork')
        // console.log(assignment)
        res.render('students-works/submissions', { works: assignment.uploadedWork, course })
    }


}



module.exports = new CourseController