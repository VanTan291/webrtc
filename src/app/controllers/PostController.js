const PostService = require('../services/PostService');

class PostController
{
    async create(req, res)
    {
        let inputs = [];
        inputs['file'] = req.file;
        inputs['user'] = req.user;
        inputs['data'] = req.body;

        console.log(req.file);
        return await PostService.create(inputs)
            .then((data) => {
                return res.status(200).json({ data: data });
            })
            .catch((error) => {
                console.log('error: ', error)
                return res.status(403).json(error);
            });
    }
}

module.exports = new PostController;
