const express = require('express')
const router = express.Router()
const courseController = require('../app/controllers/course.controller')
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const { ensureSpeCrs, ensureUploadMat } = require('../middleware/ensureRole')
const Material = require('../app/models/material.model')
const Assignment = require('../app/models/assignment.model')
const User = require('../app/models/user.model')
const Course = require('../app/models/course.model')
const Uploaded = require('../app/models/uploadedAsm.model')

// Get classes and specific classes
router.get('/c', courseController.getCourses)
router.get('/c/:courseID', ensureSpeCrs, courseController.getSpeCrs)

// Get create materials form & post & get materials & specific materials 
router.get('/c/:courseID/m', ensureUploadMat, courseController.getCreateMaterials)
router.post('/c/:courseID/m', upload.single('image'), async (req, res, next) => {
    try {
        const courseID = req.params.courseID
        const result = await cloudinary.uploader.upload(req.file.path)
        // new material
        let material = new Material({
            name: req.body.name,
            description: req.body.description,
            cloudinary_url: result.secure_url,
            cloudinary_id: result.public_id
        })
        const course = await Course.findById(courseID)
        material.course = course
        await material.save()
        course.materials.push(material._id)
        await course.save()
        req.flash('success', `${material.name} has been created successfully!`)
        res.redirect('back')
    } catch (error) {
        next(error)
    }
})
router.get('/c/:courseID/m/all', ensureSpeCrs, courseController.getMaterials)
router.get('/c/:courseID/m/:materialID', ensureSpeCrs, courseController.getSpeMaterials)

// Get create new asm form & get assignments & specific assignment
router.get('/c/:courseID/a', ensureUploadMat, courseController.getCreateAssignments)
router.post('/c/:courseID/a', upload.single('image'), async (req, res, next) => {
    try {
        const courseID = req.params.courseID
        const result = await cloudinary.uploader.upload(req.file.path)
        let assignment = new Assignment({
            name: req.body.name,
            description: req.body.description,
            cloudinary_url: result.secure_url,
            cloudinary_id: result.public_id,
        })
        const course = await Course.findById(courseID)
        assignment.course = course
        await assignment.save()
        course.assignments.push(assignment._id)
        await course.save()
        req.flash('success', `${assignment.name} has been uploaded!`)
        res.redirect('back')
    } catch (error) {
        next(error)
    }
})
router.get('/c/:courseID/a/all', ensureSpeCrs, courseController.getAllAssignments)
router.get('/c/:courseID/a/:assignmentID', ensureSpeCrs, courseController.getSpeAssignments)
router.get('/c/:courseID/a/:assignmentID/submissions', ensureUploadMat, courseController.getAllWorks)

// Get create upload works form for assignments and specific works to feedback
router.post('/c/:courseID/a/:assignmentID', upload.single('image'), async (req, res, next) => {
    try {
        const assignmentID = req.params.assignmentID
        const user = req.user.id
        const result = await cloudinary.uploader.upload(req.file.path)
        let uploadWorks = new Uploaded({
            name: req.body.name,
            description: req.body.description,
            cloudinary_url: result.secure_url,
            cloudinary_id: result.public_id,
            user
        })
        const assignment = await Assignment.findById(assignmentID)
        uploadWorks.assignments = assignment // assignments = field in collection
        await uploadWorks.save()
        assignment.uploadedWork.push(uploadWorks._id)
        await assignment.save()
        req.flash('success', 'Your assignments has been uploaded successfully!')
        res.redirect('back')
    } catch (error) {
        next(error)
    }
})

router.get('/c/:courseID/a/:assignmentID/submissions/:submissionID/cmt', ensureUploadMat, courseController.getSpeStudentWork)
router.post('/c/:courseID/a/:assignmentID/submissions/:submissionID/cmt', ensureUploadMat, courseController.commentStudentWorks)
router.post('/c/:courseID/a/:assignmentID/submissions', ensureUploadMat, courseController.gradeStudentWorks)



module.exports = router
