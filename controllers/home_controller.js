const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async function(req, res){
    

    // Populate the user of each post
    try{

        
        // Populate the likes of each post and comments
        let posts = await Post.find({})
        .sort('-createdAt')     // used to sort the post in recent to oldest 
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'likes'
            }
        })
        .populate('likes'); // for posts

        let users = await User.find({});
        

        return res.render('home', {
            title: 'Codeorzo | Home',
            post_list: posts,
            user_list: users
        });
    }catch(err){
        console.log(err);
        return;
    }
};