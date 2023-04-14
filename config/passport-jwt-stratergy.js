const passport = require('passport');

const jwtStratergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user')

let opts = {

    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'dummy'

}

passport.use(new jwtStratergy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log('Error in finding user ---> JWT');
            return;
        }
        if(user){
            return done(null,user)
        }
        else{
            return(null,false)
        }
    })
}));

module.exports = passport;
