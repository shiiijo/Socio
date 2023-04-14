const passport = require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user')


passport.use(new googleStratergy({

    clientID:"939603900533-pde9nkmf443ihp5dpq5oljb06uttngdg.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"

},function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec( function(err,user){
        if(err){
            console.log('Error in finding user ---> gOuth');
            return;
        }
        if(user){
            console.log(profile)
            return done(null,user)
        }
        else{
            //if  user not found , allow option to sign-up option to create profile
            User.create({
                name : profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('Error in creating user ---> gOuth');
                    return;
                }
                return done(null,user);
            })
        }
    })
}));

module.exports = passport;

