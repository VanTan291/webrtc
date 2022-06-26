const Post = require('../models/Post');
const AmazonS3File = require('../common/aws');

class PostService {

    s3 = new AmazonS3File();

    async create(params)
    {
        let file = await this.s3.saveFileS3(params.file, params.user._id);

        try {
            const post = new Post({
                user_id: params.user._id,
                content: params.data.content,
                file_url: file.Location,
                like: params.data.like,
                share: params.data.share,
                comment: params.data.comment,
                type: params.data.type,
                status: params.data.status,
                date_create : Date.now()
            });

            let newPost = post.save();

            return newPost;
        } catch (error) {
            return false
        }
    }

    async show(req)
    {
        try {
            const user = req.user;
            const listPost = await Post.find({user_id: user._id}).lean();
            
            return listPost;
        } catch (error) {
            return false
        }
    }
}

module.exports = new PostService;