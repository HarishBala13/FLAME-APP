const  mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegisterSchema = new Schema({
    User_Email:{
        type:String, required:true,
    },
    User_Name:{
        type:String, required:true,
    },
    User_College_Name:{
        type:String, required:true,
    },
    User_Team_Members:{
        type:String, required: true,
    },
    User_Mobile_Number:{
        type:String, required:true,
    },
    Team_Count:{
        type:String, required:true,
    },
    Year_Of_Study:{
        type:String, required:true,
    },
    Technical_Event:{
        type:String, required:true,
    },
    Non_Technical_Event:{
        type:String, required:true,
    },
    Workshop:{
        type:String, required:false,
    }    
});
module.exports = mongoose.model("Registration", RegisterSchema);