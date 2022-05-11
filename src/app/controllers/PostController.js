const UserService = require('../services/PostService');

class PostController
{
    async create(req, res)
    {
        console.log(req.user);
        res.send('sss');
    }
}

module.exports = new PostController;
