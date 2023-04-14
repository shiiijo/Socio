const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
//     store obj id of user who liked it
    user:{
        type : mongoose.Schema.ObjectId

    },
    // this field used for defining the type of the liked object 
    // liked object may be post or comment
    // here dynamic referncing is used --> liked object is decided dynamically
    likeable:{
        type : mongoose.Schema.ObjectId,
        require:true,
        refPath : 'onModel' // it is the path where dynamic ref is defined
    },
// dynamic ref path
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']

    }
},{
    timestamps:true
});

module.exports = Like = mongoose.model('Like',likeSchema);