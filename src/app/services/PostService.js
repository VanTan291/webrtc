const Post = require('../models/Post');
const AmazonS3File = require('../common/aws');

class PostService {
    s3 = new AmazonS3File();

    create(params)
    {
        return new Promise(async (resolve, reject) => {
            if (params.file && params.file != '') {
                var file = await this.s3.saveFileS3(params.file, params.user._id);
            }
			
            const post = await new Post({
                user: params.user._id,
                content: params.data.content,
                file_url: file ? file.Location : '',
                like: params.data.like,
                share: params.data.share,
                comment: params.data.comment,
                type: params.data.type,
                status: params.data.status,
                date_create : Date.now()
            });

            let newPost = await post.save();

            if (newPost) {
                const listPost = await Post.find({user: params.user._id}).populate('user', 'name').sort({'date_create': -1}).lean();

                return resolve({ 
                    message: 'Tạo bài viết thành công',
                    data: listPost
                });
            } else {
                return reject({
                    message: 'Tạo bài viết thất bại',
                });
            }
		})
    }

    async show(req)
    {
        return new Promise(async (resolve, reject) => {
			const user = req.user;
            const listPost = await Post.find({user: user._id}).populate('user', 'name').sort({'date_create': -1}).lean();

            if (listPost) {
                return resolve({ data: listPost });
            } else {
                return reject({ message: 'Khong co data' });
            }
		})
    }

    async delete(req)
    {
        return new Promise(async (resolve, reject) => {
			const user = req.user;
            const deletePost = await Post.deleteOne({ _id: req.body.id });
            
            if (deletePost) {
                const listPost = await Post.find({user: user._id}).populate('user', 'name').sort({'date_create': -1}).lean();

                return resolve({ 
                    message: 'Xoá bài viết thành công',
                    data: listPost
                });
            } else {
                return reject({ message: 'Xoá thất bại' });
            }
		})
    }
}

module.exports = new PostService;
