const mongoose = require('mongoose')
const Category = require('../models/category.model')
const User = require('../models/user.model')
const Course = require('../models/course.model')


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

    // [GET] all courses
    async getAllCourses(req, res, next) {
        // const { catID } = req.params
        // const category = await Course.findById(catID)
        // console.log(category.course)
        const courses = await Course.find()
        res.render('course/course', { courses })
    }
    // [GET] add new courses
    async getCourse(req, res, next) {
        const cat = await Category.find()
        res.render('course/add_course', { cat })
    }

    // [POST] add new courses
    async newCourse(req, res, next) {
        try {

            // create new course 
            const newCourse = new Course(req.body)
            await newCourse.save()

            
            req.flash('success', `${newCourse.name} has been created successfully!`)
            res.redirect('back')


        } catch (error) {
            next(error)
        }
    }

}

module.exports = new AadController