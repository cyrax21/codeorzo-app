const Comment = require('../model/comment');
const Post = require('../model/post');
const commentsMailer = require('../mailers/comments_mailer');
module.exports.create = async function(req, res) {

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);

            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            post = await post.populate('user', 'name').execPopulate();
            commentsMailer.newComment(comment, post);

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "comment created!"
                });
            }
            
            req.flash('success', 'Comment Added into the Post ! ');
            res.redirect('/');
        }
    }catch(err){
        req.flash('Error', err);
        return;
    }
};

module.exports.destroy = async function(req, res) {
    
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){

            // Before deleting the comment we are storing the post id so that we can 
            // update the comments array from that database later.
            let postId = comment.post;

            // Remove the comment
            comment.remove();

            // This pull update the comments array 
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "comment deleted"
                });
            }

            req.flash('success', 'Comment Deleted from the Post ! ');


            return res.redirect('back');
        } else {
            req.flash('Error', 'Cant delete others Comments');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('Error', err);
        return;
    }
}