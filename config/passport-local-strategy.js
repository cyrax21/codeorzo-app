const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');


// Authentication using passport.js
passport.use(new LocalStrategy({
    //Defining what is username field
        usernameField: 'email',
        passReqToCallback: true // it helps in pulling out flash message and put it into request
    },
    function(req, email, password, done) {
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user) {
            // if any error throw it
            if(err) {
                req.flash('error', err);
                return done(err);
            }

            // if user not found or invalid password
            if(!user || user.password != password) {
                req.flash('error','Invalid username/password');
                return done(null, false);
            }

            //else user is authorized
            return done(null, user);
        });
    }
));

// serializing  the user to decide which key is to be key in the cookie
passport.serializeUser( function(user, done){
    done(null, user._id);
});

// deserializing the user from the key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){ 
            console.log(' Error in finding a user --> passport');
            return done(err);
        }
        return done(null, user);
    });
});

//check if user is authenticated or not
passport.checkAuthentication = function(req, res, next){
    // it detects, 
    // if user is signed in, then pass on the request to the action/controllers
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
};

// Used to get information of user and pass it to the views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the information of current user from the session cookie and 
        //we are simply sending this to the local for the views
        res.locals.user = req.user;
    }
    next(); 
}

module.exports = passport;