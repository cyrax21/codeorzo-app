const Post = require('../model/post');


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