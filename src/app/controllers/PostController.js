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

    async show(req, res)
    {
        console.log(req.user);
        return await PostService.show(req)
            .then((data) => {
                return res.status(200).json({ data: data });
            })
            .catch((error) => {
                console.log('error: ', error)
                return res.status(403).json(error);
            });

        //return res.status(200).json('ss');
    }
}

module.exports = new PostController;
