const Post = require('../model/post');
const Comment = require('../model/comment');

// This controller for making a post
module.exports.create = async function(req, res){

    try{
        let newPost = await Post.create({
            // Passing Context
            content: req.body.content,  
            user: req.user._id,        // we are only storing the user id 
        });
        console.log("new post : ", newPost);
        return res.redirect('back');
    }catch(err){
        console.log("Error: ", err);
        return;
    }
    
};

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove(); // Used to remove the Object from data

           //  Deleting the comments in the post
           // We are passing post id as query for deleting comments
            let comment = await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');
       } else {
           return res.redirect('back');
       }
    }catch(err){
        console.log("Error: ", err);
        return;
    }
}