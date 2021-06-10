const mongoose = require('mongoose');

// Create a postSchema 
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //Include all the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true,
});

// Compiling our schema with the model 
const Post = mongoose.model('Post', postSchema);


module.exports = Post;