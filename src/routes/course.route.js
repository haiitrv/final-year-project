const express = require('express')
const router = express.Router()
const courseController = require('../app/controllers/course.controller')
const { ensureSpeCrs } = require('../middleware/ensureSpeCat')

router.get('/c', courseController.getCourses)
router.get('/c/:id', ensureSpeCrs , courseController.getSpeCrs)
router.get('/c/:id/m', ensureSpeCrs, courseController.getCreateMaterials)
router.post('/c/:id/m', ensureSpeCrs, courseController.postCreateMaterials)
router.get('/c/:id/m/all', ensureSpeCrs, courseController.getMaterials)
router.get('/c/:id/m/:id', ensureSpeCrs, courseController.getSpeMaterials)




module.exports = router
