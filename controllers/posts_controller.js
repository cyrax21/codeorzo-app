const Post = require('../model/post');
const Comment = require('../model/comment');

// This controller for making a post
module.exports.create = async function(req, res){

    try{
        let post = await Post.create({
            // Passing Context
            content: req.body.content,  
            user: req.user._id,        // we are only storing the user id 
        });

        // ! The request send by ajax is stored at 'req.xhr'  
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        
        req.flash('success', 'Post created successfully! ');

        return res.redirect('back');

    }catch(err){
        req.flash('Error', err);
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
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and Associated Comment deleted successfully!');

            return res.redirect('back');
        } else {
           
            req.flash('Error', 'You can`t delete this post !');

            return res.redirect('back');
        }
    }catch(err){
        req.flash('Error', err);
        return;
    }
}