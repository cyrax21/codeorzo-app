const Post = require('../model/post');
const Comment = require('../model/comment');

// This controller for making a post
module.exports.create = function(req, res){

    Post.create({
        // Passing Context
        content: req.body.content,  
        user: req.user._id,        // we are only storing the user id 
    }, function(err, newPost){     // Callback Function
        if(err){
            console.log('Error: in Creating a posts ');
            return;
        }
        console.log("new post : ", newPost);
        return res.redirect('back');
    });
};

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){


        // .id means converting the object id into a string 
        if(post.user == req.user.id){
             post.remove(); // Used to remove the Object from data

            //  Deleting the comments in the post
            // We are passing post id as query for deleting comments
             Comment.deleteMany({ post: req.params.id }, function(err){
                 return res.redirect('back');
             })
        } else {
            return res.redirect('back');
        }
    })
}