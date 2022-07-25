const UserService = require('../services/Userservice');

class UserController
{

    //[GET] /
    async register(req, res)
    {
        console.log(req.body);
        return await UserService.register(req.body)
            .then((data) => {
                console.log(data);
                return res.status(200).json({ data: data });
            })
            .catch((error) => {
                console.log('error: ', error)
                return res.status(403).json(error);
            });
    }

    async login(req, res)
    {
        return await UserService.login(req.body)
            .then((data) => {
                if (data.status == 200) {
                    return res.status(200).json({ 
                        token: data.token,
                        status: 200
                    });
                } else {
                    console.log(data.message);
                    return res.status(403).json({ 
                        message: data.message,
                        status: 403
                    });
                }
                
            })
            .catch((error) => {
                console.log('error: ', error)
                return res.status(403).json(error);
            });
    }

    async show(req, res)
    {
        let user = req.user;

        return  await UserService.show(user)
            .then((data) => {
                return res.status(200).json({ result: data });
            })
            .catch((error) => {
                console.log('error: ', error)
                return res.status(403).json(error);
            })
    }

    async test(req, res)
    {
        console.log(req.user);
        res.send('sss');
    }
}

module.exports = new UserController;
