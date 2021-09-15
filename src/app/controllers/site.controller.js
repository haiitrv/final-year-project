const mongoose = require('mongoose')
const Category = require('../models/category.model')

class SiteController {

    async index(req, res, next) {
        const categories = await Category.find()
        res.render('site', { categories })
    }
    
}



module.exports = new SiteController