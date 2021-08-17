
class SiteController {

    index(req, res, next) {
        res.render('site')
    }

}

module.exports = new SiteController