
class UserController {

    async index(req, res, next) {
        const person = req.user
        // Get each person's profile based on the email logged in
        res.render('profile', { person })
    }

}

module.exports = new UserController