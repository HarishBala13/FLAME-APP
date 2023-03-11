const  mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegisterSchema = new Schema({
    User_Name:{
        type:String, required:true,
    },
    User_Email:{
        type:String, required:true,
    },
    User_College_Name:{
        type:String, required:true,
    },
    User_Mobile_Number:{
        type:String, required:true,
    }
});
module.exports = mongoose.model("Registration", RegisterSchema);