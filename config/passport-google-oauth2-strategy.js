const passport = require('passport');
// As we know, passport-google-auth is combination of oauth and oauth2.0.0
// so we need to inform it
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');

// Tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: '892611351534-vduv0r7f0c20r4ks84gqmnaj74kc2j70.apps.googleusercontent.com',
        clientSecret: 'd7pRbE63zl_7vt4ROhsdoNu0',
        callbackURL: 'http://localhost:8000/users/auth/google/callback',
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
