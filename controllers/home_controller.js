const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = function(req, res){
    
    
    // Populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        if(err){ 
            console.log('Error: in Finding post '); 
            return;
        }
        return res.render('home', { 
            title: 'Codeorzo | Home',
            post_list: posts
        });
    })
}