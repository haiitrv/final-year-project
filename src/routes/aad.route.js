const express = require('express')
const router = express.Router()
const aadController = require('../app/controllers/aad.controller')
const Category = require('../app/models/category.model')


router.get('/category', aadController.getCategory)
router.get('/add', aadController.add)
router.post('/add', aadController.addCat)


module.exports = router