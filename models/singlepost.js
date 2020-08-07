let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SinglepostSchema = new Schema({
    title: {
        type: String,
    }, 
    description: {
        type: String,
    },
    image:{
        type: String,
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

let singlepost = mongoose.model("singlepost", SinglepostSchema);

module.exports = singlepost;