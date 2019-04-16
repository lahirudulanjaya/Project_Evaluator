const mongoose = require('mongoose');
var Studentdetailschema= new mongoose.Schema(
    {
        Registrationnumber:{
            unique:true,
            type:String
        },
        Name:{
            type:String
        },
        Email:{
            type:String
        },
        isRegistered:{
            type:Boolean,
            default:false
        },
        Projectname:[]
    }
)

mongoose.model("Studentdetail",Studentdetailschema)
