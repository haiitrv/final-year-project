const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/site.controller')
const { ensureTeacher } = require('../middleware/ensureRole')
const { ensureStudent } = require('../middleware/ensureRole')

router.get('/', siteController.index)

module.exports = router
