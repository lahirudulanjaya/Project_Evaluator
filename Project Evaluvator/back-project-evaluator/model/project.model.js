const mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema({
  
    Projectname:{
        type:String,
        unique:true
    },
    ProjectType:{
        type:String
    },
    Initiatedate:{
        type:Date
    },
    Acadamicyear:{
        type:String
    },
    Status:{
        type:Boolean,
        default:false
    },
    groups:[{
        groupno:{
            type:String
        },
        students:[]
    }]


})

mongoose.model('Project',ProjectSchema);