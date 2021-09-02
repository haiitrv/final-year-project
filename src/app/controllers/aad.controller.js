const mongoose = require('mongoose')
const Category = require('../models/category.model')


class AadController {

    // [GET] all categories
    async getCategory(req, res, next) {

        try {
            // Find all users
            const categories = await Category.find()
            res.render('category', { categories })

        } catch (error) {
            next(error)
        }
    }

    // [GET] add new categories
    async add(req, res, next) { 
        res.render('add_category')
    }
    // [POST] add new categories
    async addCat(req, res, next) {
        try {
            const category = new Category(req.body)
            await category.save()
            req.flash('success', `${category.name} has been created succesfully!`)
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new AadController