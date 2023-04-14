const Post = require("../models/post")
const User = require("../models/user")

// to avoid call back hell for async operations we can use promises or async-await
// we will use async-await here
module.exports.home= async function(req,res){

    try {

         //  this will populate user detailes using user obj id from post collection
         let posts = await Post.find({}).populate('user').populate({
            //  it will polulate comment added under post in home.ejs
            path : 'comments',
            // it will populate user who added that comment
            populate : {
                path : 'user'
            },
            populate :
            {
                path : 'likes'
            }
        }).populate('likes')
        let users = await User.find({});

        return res.render('home.ejs',{ 
            title:'Home',
            posts :posts,
            all_users : users
        });

    } catch (error) {
        console.log('Error -->',error)
    }
}

    //  same code without async-await -- > it has call back hell

    // module.exports.home=function(req,res){
    //     //  this will populate user detailes using user obj id from post collection
    //         Post.find({}).populate('user').populate({
    //             //  it will polulate comment added under post in home.ejs
    //             path : 'comments',
    //             // it will populate user who added that comment
    //             populate : {
    //                 path : 'user'
    //             }
    //         })
    //         .exec(function(err,posts){
    //             User.find({},function(err,users){
    //                 return res.render('home.ejs',{ 
    //                     title:'Home',
    //                     posts :posts,
    //                     all_users : users
    //             });
    //             });
    //     });
    //     }