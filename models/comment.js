const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    content :{
        type:String,
        required:true
    },
    // linking post schema with user schema 1:m
    user :{
       type: mongoose.Schema.Types.ObjectId,
       ref : 'User'
    },
    // linking comment schema with post schema 1:m
    post :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post'
     },
     likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
        ref : 'Like'
        }
    ]

},{
    timestamps:true
});

module.exports = Comment = mongoose.model('Comment',commentSchema)