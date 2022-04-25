const User = require('../models/User');

class IndexController {

    //[GET] /
    index(req, res) {
        const userCreate = new User({
            author: 1,
            name: 'lam van tan',
            email: 'lamvantan@gmail.com',
            password: '123456',
            date: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        userCreate.save(function(err) {
            if(err){
                res.json({
                    result: false,
                    message: 'mongo error'
                });
            } else {
                res.json({
                    result: true,
                    message: userCreate
                });
            }
        })

        //res.render('index');
        res.send('ac');
    }

    //:slug
    show(req, res) {
        res.send('ac');
    }
}

module.exports = new IndexController;
