const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile.ejs',{
        title:'Profile',
        profile_user:user
        });
    })
}

module.exports.update_profile = function(req,res){

    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        if(err){
            console.log("Failed to update user ...")
            return res.redirect("back")
        }
        User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("*****Multer Error",err)
            }
            console.log(req.file);
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password

            if(req.file){
            
                // delete previosly added img from code base if it exists
                console.log('path --->',user.avatar)
                if(user.avatar){
                    if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                }

                // this is saving path of the file in database
                user.avatar = User.avatarPath+'/'+req.file.filename
            }
            user.save()
        })
        console.log("User details updated succsussfully ...")
        return res.redirect('back')
    })
}

module.exports.signUp = function(req,res){
    // if user is signed in and still session is not terminated , user should not logout he will be signed in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up.ejs',{
        title:'Sign Up'
    });
}

module.exports.signIn = function(req,res){
//     if user is signed in and still session is not terminated , user should not logout he will be signed in
if(req.isAuthenticated()){
    return res.redirect('/')
}

    return res.render('user_sign_in.ejs',{
        title:'Sign In'
    });
}

// get data from sign up form and create user
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(user==null){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user');
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');

        }
    });
}

// get data from sign in form
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

// sign out impl - for this we are destroying active session
module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) {
             return (err); 
        }
        req.flash('success','You have logged out');
        return res.redirect('/');
    });
}