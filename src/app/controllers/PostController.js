const PostService = require('../services/PostService');

class PostController
{
    async create(req, res)
    {
        let inputs = [];
        inputs['file'] = req.file;
        inputs['user'] = req.user;
        inputs['data'] = req.body;

        return await PostService.create(inputs)
            .then((data) => {
                return res.status(200).json({ code: 200, data: data });
            })
            .catch((error) => {
                return res.status(403).json({ code: 403, message: error.message });
            })
            .finally(() => {
                console.log('done!');
            });
    }

    async show(req, res)
    {
        return await PostService.show(req)
            .then((data) => {
                return res.status(200).json({ code: 200, result: data });
            })
            .catch((error) => {
                console.log(error);
                return res.status(403).json({ code: 403, message: error.message });
            })
            .finally(() => {
                console.log('done!');
            })
    }
}

module.exports = new PostController;
