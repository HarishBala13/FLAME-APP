const  mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegisterSchema = new Schema({
    Participant_Email:{
        type:String, required:true,
    },
    Participant_Name_1:{
        type:String, required:true,
    },
    Participant_Name_2:{
        type:String, required:true,
    },
    Participant_Name_3:{
        type:String, required:true,
    },
    Participant_Name_4:{
        type:String, required:true,
    },
    College_Name:{
        type:String, required:true,
    },
    Team_Name:{
        type:String, required: true,
    },
    Participant_Mobile_Number:{
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