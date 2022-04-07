class IndexController {

    //[GET] /
    index(req, res) {
        res.render('index')
    }

    //:slug
    show(req, res) {
        res.send('ac');
    }
}

module.exports = new IndexController;
