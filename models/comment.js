let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    comment: {
        type: String,
    }, 
    singlepost:{
        type: Schema.ObjectId,
        ref: 'singlepost'
    },
    userId:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isRemoved: {
        type: Boolean,
        "default": false
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    modifiedBy: {
        type: Schema.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    });

let Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;