const Post = require("../../../models/post")
const Comment = require("../../../models/comment")

module.exports.index = async function(req,res){

    //  this will populate user detailes using user obj id from post collection
    let posts = await Post.find({}).populate('user').populate({
        //  it will polulate comment added under post in home.ejs
        path : 'comments',
        // it will populate user who added that comment
        populate : {
            path : 'user'
        }
    })

    return res.json(200,{
        message:"List of posts",
        posts:posts

    });
}


module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
// req.user.id is string version of req.user._id
        if(post.user == req.user.id){
        post.remove();
        Comment.deleteMany({post: req.params.id},function(err){
            console.log("Post deleted Succsussfully")
            // req.flash('success','Post deleted succesussfully')
            return res.json(200,{
                "success_code": "200",
                message:"Post deleted with all related comments",
                "post_id" : req.params.id
            })
        });
    }
    else{
        console.log("Not authorized to delete this post")
        return res.json(401,{
            message : 'Not authorized to delete this post'
        })
    }


    });
    
}