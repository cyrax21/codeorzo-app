const Comment = require('../model/comment');
const Post = require('../model/post');
module.exports.create = function(req, res) {
    Post.findById(req.body.post, function(err, post) {
        if(err){
            console.log(" Error: in finding the post where comment is done");
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                if(err){
                    console.log(" Error: in creating the post");
                    return;
                }

                post.comments.push(comment); // It will add the comment to postSchema in db

                // When we are updating the object in db we need to save to indicate this the final version
                // When we write save this changes saved in db before they were in RAM
                post.save(); 


                res.redirect('/');
            });
        }
    });
};

module.exports.destroy = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if(err){
            console.log(" Error: in finding the comment");
            return;
        }
        if(comment.user == req.user.id){

            // Before deleting the comment we are storing the post id so that we can 
            // update the comments array from that database later.
            let postId = comment.post;

            // Remove the comment
            comment.remove();

            // This pull update the comments array 
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    });
}