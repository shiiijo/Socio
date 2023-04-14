
const passport = require('passport')

const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/user')

// authentication
passport.use(new LocalStratergy(
  {usernameField:'email',
  passReqToCallback: true

},function(req,email,password,done){
    User.findOne({
        email:email
    },function(err,user){
      if(err){
        req.flash('error',err)
        console.log('Error in finding user -- passport')
        return done(err);
      }
      if(user.password != password || user == null){
        req.flash('error','Invalid Username/Password');
        console.log('Invalid username/password');
        return done(null,false);
      }
    return done(null,user);

    });
}));

// serializing the user 
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// de-serializing the user 
passport.deserializeUser(function(id,done){
      User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user -- passport')
            return done(err);
          }
        return done(null,user);
      })
})

//  check if the user is autenticated or not -- > it is used as middleware while going to profile page
passport.checkAuthentication = function(req,res,next){
  
  // if user is signed in , then pass the request to the next function (in controller)
  if(req.isAuthenticated()){
    return next();
  }
    // if user is not signed in
  return res.redirect('/users/sign-in')
}


passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    //  req.user contains contains current signed in user from the current session cookie andd we are sending this to the locales for the views 
    // now locales will be having all data from the data-base about the current user
    res.locals.user = req.user
  }
  next();

}

module.exports = passport;

