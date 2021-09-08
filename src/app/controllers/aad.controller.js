const mongoose = require('mongoose')
const Category = require('../models/category.model')
const User = require('../models/user.model')


class AadController {

    // [GET] all categories
    async getCategory(req, res, next) {

        try {
            const categories = await Category.find()
            res.render('category/category', { categories })

        } catch (error) {
            next(error)
        }
    }



    // [GET] specific category

    async getSpeCat(req, res, next) {
        try {
            const { id } = req.params
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                req.flash('error', 'Invalid ID!!!')
                res.redirect('/aad/categories')
                return
            }
            const cat = await Category.findById(id)
            res.render('category/spe_category', { cat })
        } catch (error) {
            next(error)
        }
    }


    // [GET] add new categories
    async add(req, res, next) {
        res.render('category/add_category')
    }
    // [POST] add new categories
    async addCat(req, res, next) {
        const category = new Category(req.body)
        await category.save()
        req.flash('success', `${category.name} has been created successfully!`)
        res.redirect('back')
    } catch(error) {
        next(error)
    }

}

module.exports = new AadController