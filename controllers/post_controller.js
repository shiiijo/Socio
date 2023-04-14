const Post = require('../models/post')
const Comment = require("../models/comment")

module.exports.create = function(req,res){
    Post.create({
        content :req.body.content,
        user : req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post');
            req.flash('error','Error in Publishing post')
            return;
        }
        req.flash('success','Post Published succesussfully')
        return res.redirect('back');
    });
    
}


module.exports.destroy =  function(req,res){
    Post.findById(req.params.id,function(err,post){
// req.user.id is string version of req.user._id
        if(post.user == req.user.id){

        post.remove();
        Comment.deleteMany({post: req.params.id},function(err){
            console.log("Post deleted Succsussfully")
            req.flash('success','Post deleted succesussfully')
            return res.redirect("back")
        });
    }
    else{
        req.flash('error','Not Authorized to delete this post')
        console.log("Failed to delete the post")
        return res.redirect("back")
    }


    });
    
}