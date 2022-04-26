const UserService = require('../services/Userservice');

class UserController {

    //[GET] /
    async register(req, res) {
        console.log(req.body);
        return await UserService.createUser(req.body)
            .then((data) => {
                console.log(data);
                return res.status(200).json({ data: data });
            })
            .catch((error) => {
                console.log('error: ', error)
                return res.status(403).json(error);
            });
        //res.render('index');
        //res.send('ac');
    }

    //:slug
    show(req, res) {
        res.send('ac');
    }
}

module.exports = new UserController;