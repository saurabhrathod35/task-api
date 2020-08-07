var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String,
    },
    username:{
        type: String,
        require:true
    },
    firstname:{
        type: String,
    },
    lastname:{
        type: String,
    },
    middlename:{
        type: String,
    },
     phonenumber:{
         type:String
    }, 
    name: {
        type: String,
    },
    password: {
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
    },

},
    {
        timestamps: true
    }
);

mongoose.model('User', UserSchema);