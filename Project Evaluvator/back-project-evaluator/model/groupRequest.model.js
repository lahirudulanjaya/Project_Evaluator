
const mongoose =require('mongoose')


var Grouprequest=new mongoose.Schema({

    reciver:[
       
    ],
    sender :{
        type:String,
        unique:true
    }

})

mongoose.model("Grouprequest",Grouprequest)