const User = require('../model/user');

module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: 'Codeorzo | Profile '
    })
}

// Render the signIn up
module.exports.signUp = function(req, res) {

    // We want if user is sign-in it should not have access to sign-in page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codeorzo | Signup',
    })
}

// Render the signIn page
module.exports.signIn = function(req, res) {

    // We want if user is sign-in it should not have access to sign-up page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Codeorzo | Signin',
    })
}

// Create a Post Request for user creation
module.exports.create = function(req, res) {
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user) {
        if(err){ console.log( ' Error in Finding User in Signing up'); return}

        if(!user){
            User.create(req.body, function(err, newUser) {
                if(err){ console.log( ' Error in Creating User while Signing up'); return}
                console.log( ' user not found ');
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
};

// Create a Post Request for user signin session
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

// this is a function used to logout the user by removing cookies
module.exports.destroySession = function(req, res) {
    req.logout();

    return res.redirect('/');
}