const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg' && ext !== '.docx' && ext !== '.pdf') {
            cb(new Error('This file type is no longer supported...!'), false)
            return
        }
        cb(null, true)
    }
})