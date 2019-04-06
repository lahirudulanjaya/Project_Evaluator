const mongoose = require('mongoose');
var Studentdetailschema= new mongoose.Schema(
    {
        Registrationnumber:{
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
        }
    }
)

mongoose.model("Studentdetail",Studentdetailschema)
