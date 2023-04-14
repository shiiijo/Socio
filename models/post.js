const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content :{
        type:String,
        required:true
    },
    // linking post schema with user schema 1:m
    user :{
       type: mongoose.Schema.Types.ObjectId,
       ref : 'User'
    },
    // include the aray of id's of all comments in this post schema 
    comments : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
        ref : 'Like'
        }
    ]

},{
    timestamps:true
});

module.exports = Post = mongoose.model('Post',postSchema)