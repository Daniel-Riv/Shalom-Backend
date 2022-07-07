const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'USER',
        enum:['USER','ADMIN']
    }

});

module.exports = model('user',UserSchema);