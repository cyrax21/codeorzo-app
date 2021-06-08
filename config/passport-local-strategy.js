const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');


// Authentication using passport.js
passport.use(new LocalStrategy({
    //Defining what is username field
        usernameField: 'email'
    },
    function(email, password, done) {
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user) {
            // if any error throw it
            if(err) {
                console.log('Error : in finding user -->passport');
                return done(err);
            }

            // if user not found or invalid password
            if(!user || user.password != password) {
                console.log(" Invalid username/password");
                return done(null, false);
            }

            //else user is authorized
            return done(null, true);
        });
    }
));

// serializing  the user to decide which key is to be key in the cookie
passport.serializeUser( function(user, done){
    done(null, user.id);
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

module.exports = passport;