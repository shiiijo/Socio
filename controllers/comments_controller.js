const commentMailer = require('../mailers/comments_mailer');
const Comment = require('../models/comment')
const Post = require('../models/post')
const commentEmailWorkers = require('../workers/comment_email_worker')
const queue = require('../config/kue');

module.exports.create = function(req,res){
    // find post with given post id and then add comment to the post
    Post.findById(req.body.post_id,function(err,post){
        if(err){
            console.log("error in finding the post")
            return res.redirect('back');
        }
        Comment.create({
            content :req.body.content,
            user : req.user._id,
            post : req.body.post_id
        },function(err,comment){
            if(err){
                console.log('error in adding a comment');
                return res.redirect('back');;
            }
            
            req.flash('success','Comment added succesussfully')
            // pushing comment into the array , defined in the post schema
            post.comments.push(comment);
            post.save();

            // sends mail to the person who made comment
            console.log(req.body)
            // commentMailer.newComment(comment,req.user.name,req.user.email)
            
            var job = queue.create('emailWorker', {
                "comment": comment,
                "user_name": req.user.name,
                "user_email":req.user.email,
            }).save( function(err){
               if( !err ) {
                console.log( job.id );
                return
               }
               console.log('Job created is -- >',job.id)
            });

            res.redirect("back")
        });
    });
    
}

module.exports.destroy = function(req,res){
    // first find comment , if it exits then find to which post it belongs
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
        post_id = comment.post
        // remove comment and using post id remove its entry from comments array which is there in post schema
        comment.remove();
        Post.findByIdAndUpdate(post_id,{ $pull:{comments:req.params.id}},function(err,post){
            req.flash('success','comment deleted succesussfully')
            return res.redirect('back')
        });

        }

    });
}