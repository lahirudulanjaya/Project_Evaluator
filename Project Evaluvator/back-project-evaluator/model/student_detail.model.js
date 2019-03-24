const mongoose = require('mongoose');
var Studentdetailschema= new mongoose.Schema(
    {
        Registrationnumber:{
            type:String
        },
        Name:{
            type:String
        }
    }
)

mongoose.model("Studentdetail",Studentdetailschema)
