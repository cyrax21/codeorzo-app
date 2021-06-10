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
}