const express = require('express')
const router = express.Router()
const aadController = require('../app/controllers/aad.controller')
const Category = require('../app/models/category.model')


router.get('/categories', aadController.getCategory)
router.get('/category/:id', aadController.getSpeCat)
router.get('/add', aadController.add)
router.post('/add', aadController.addCat)
router.get('/category/:id/course', aadController.getAllCourses)
router.get('/category/:id/create', aadController.getCourse)
router.post('/category/:id/create', aadController.newCourse)

module.exports = router