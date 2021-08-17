const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/admin.controller')
const User = require('../app/models/user.model')
const { registerValidator } = require('../utils/validator')
const { body, validationResult } = require('express-validator')



router.get('/users', adminController.getUser)
router.get('/user/:id', adminController.getProfile)
router.post('/update-role', adminController.updateRole)
router.get('/add', adminController.add)
router.post('/add', [registerValidator], adminController.addUser)

module.exports = router