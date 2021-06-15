const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require('../model/user');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeorzo'
}

passport.use(new JwtStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log(' Finding in error user from JWT');
            return;
        }

        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}));

module.exports = passport;