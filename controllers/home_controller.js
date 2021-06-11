const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async function(req, res){
    

    // Populate the user of each post
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

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