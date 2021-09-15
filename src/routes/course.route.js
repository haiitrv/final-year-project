const express = require('express')
const router = express.Router()
const courseController = require('../app/controllers/course.controller')
const { ensureSpeCrs } = require('../middleware/ensureSpeCat')

router.get('/c', courseController.getCourses)
router.get('/c/:id', ensureSpeCrs , courseController.getSpeCrs)

module.exports = router
