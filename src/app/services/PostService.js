const Post = require('../models/Post');
const AmazonS3File = require('../common/aws');

class PostService {
    s3 = new AmazonS3File();

    create(params)
    {
        return new Promise(async (resolve, reject) => {
			let file = await this.s3.saveFileS3(params.file, params.user._id);
            const post = await new Post({
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

            let newPost = await post.save();

            if (newPost) {
                return resolve({ 
                    message: 'Tao bai post thanh cong',
                    data: newPost
                });
            } else {
                return reject({
                    message: 'Tao bai post that bai',
                });
            }
		})
    }

    show(req)
    {
        return new Promise(async (resolve, reject) => {
			const user = req.user;
            const listPost = await Post.find({user_id: user._id}).sort({'date_create': -1}).lean();

            if (listPost) {
                return resolve({ data: listPost });
            } else {
                return reject({ message: 'Khong co data' });
            }
		})
    }
}

module.exports = new PostService;
