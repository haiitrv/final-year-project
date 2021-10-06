const express = require('express')
const router = express.Router()
const aadController = require('../app/controllers/aad.controller')
const Course = require('../app/models/course.model')

router.get('/add', aadController.add)
router.post('/add', aadController.addCourse)
router.get('/assign', aadController.getAssign)
router.post('/assign', aadController.postAssign)


module.exports = router