const Post = require('../../../model/post');
const Comment = require('../../../model/comment');

module.exports.index = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')     // used to sort the post in recent to oldest 
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })


    return res.json(200, {
        message: "List of posts",
        post: posts
    })
};

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        post.remove(); // Used to remove the Object from data

        //  Deleting the comments in the post
        // We are passing post id as query for deleting comments
        await Comment.deleteMany({ post: req.params.id });

        return res.json(200, {
            message: "Post and associated comment deleted successfully",
        })
    }catch(err){
        console.log("****", err);
        res.status(401).json({
            message: "Unauthorized: you cannot delete the post"
        })
        return;
    }
}