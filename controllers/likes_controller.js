const Post = require('../models/post')
const Comment = require("../models/comment")
const Like = require('../models/like');

module.exports.toggleLike = async function(req,res){
    try {

        let likeable;
        let deleted = false;

        if(req.query.type = 'Post'){
            // it will return and likeable will store all the data of the array which is defined with populate fn , ie : here it is likes
            likeable = await Post.findById(req.query.id).populate('likes')
            console.log(likeable)
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes')
        }

        // check if like is done by user or not 
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if like already exists with that user
        if(existingLike){
            likeable.likes.pull(existingLike._id)
            likeable.save();

            existingLike.remove();
            deleted = true
        }

        // make new like
        else{
            
            let newLike = await Like.create({
                user: req.user._id,
                likeable:req.query._id,
                onModel: req.query.type,
            })

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        res.json(200,{
            message:" Req successful",
            "data" : deleted
        })


        
    } catch (error) {
        console.log('err')
        return res.json(500,{
            message:"Internal server error"
        })
    }
}