const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/site.controller')
const { ensureTeacher } = require('../middleware/ensureTeacher') 
const { ensureStudent } = require('../middleware/ensureStudent')

router.get('/', siteController.index)
// router.get('')



module.exports = router
