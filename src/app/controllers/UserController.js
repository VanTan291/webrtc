const UserService = require('../services/Userservice');

class UserController
{
    async register(req, res)
    {
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
            .then((user) => {
                return res.status(200).json({ code: 200, data: user });
            })
            .catch((error) => {
                console.log(error);
                return res.status(403).json({ code: 403, message: error.message });
            })
            .finally(() => {
                console.log('done!');
            })
    }

    async checkAuth(req, res)
    {
        let user = req.user;

        return await UserService.checkAuth(user)
            .then((data) => {
                return res.status(200).json({ result: data });
            })
            .catch((error) => {
                console.log('error: ', error)
                return res.status(403).json(error);
            })
    }
}

module.exports = new UserController;
