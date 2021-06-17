const Comment = require('../model/comment');
const Like = require('../model/like');
const Post = require('../model/post');

module.exports.toggleLike = async function(req, res) {
    try{

        // Like/toggle/?id="abc123"&type="Post"
        let likeable;
        let deleted = true;


        if(req.query.type=="Post"){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Check if a like already exists
        let existingLike = await Like.findOne({ 
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // if a like is already exist delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id); // removing from the post or cmt

            likeable.save(); // saving it

            existingLike.remove(); //removing existingLike so that if we relike it should work
        }else{
            // else make a like on that post
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        };

        return res.redirect('back');


    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}