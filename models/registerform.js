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
        type:String, required:false,
    },
    Participant_Name_3:{
        type:String, required:false,
    },
    Participant_Name_4:{
        type:String, required:false,
    },
    College_Name:{
        type:String, required:true,
    },
    Team_Name:{
        type:String, required: true,
    },
    Participant_Mobile_Number:{
        type:Number, required:true,
    },
    Team_Count:{
        type:Number, required:true,
    },
    Year_Of_Study:{
        type:String, required:true,
    },
    Technical_Event:{
        type:String, required:false,
    },
    Non_Technical_Event:{
        type:String, required:false,
    },
    Workshop:{
        type:String, required:false,
    },
    Registration_Fee:{
        type:Number, required: true,
    }    
});
module.exports = mongoose.model("Registration", RegisterSchema);