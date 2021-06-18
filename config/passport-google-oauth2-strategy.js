const passport = require('passport');
// As we know, passport-google-auth is combination of oauth and oauth2.0.0
// so we need to inform it
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');
const env = require('./environment');

// Tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url,
    },

    // accesstoken is used to access the info about the user
    // refreshtoken is a special token used to obtain a renewed access token
    function(accessToken, refreshToken, profile, done){
        // find the user  
        User.findOne({ email: profile.emails[0].value})
        .exec( function(err, user){
            if(err){
                console.log("Error: in google-strategy-passport", err);
                return;
            }

            console.log(profile);

            if(user){
                // if found, set the user as req.user (req.user means signin as user)
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    passport: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log("Error: in creating user google-strategy-passport", err);
                        return;
                    }

                    return done(null, user);
                });

            }
        });
    }
));

module.exports = passport;
