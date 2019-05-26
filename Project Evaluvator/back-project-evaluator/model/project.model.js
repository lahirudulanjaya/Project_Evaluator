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
        default:true
    },
    groups:[{
        groupno:{
            type:Number
        },
        students:[],
        supervisor:String,
        mentor:String
    }],
    Sheeturl:{
        type:String
    }


})

ProjectSchema.pre('findOneAndUpdate',()=>{
    console.log(this.groups)
})

mongoose.model('Project',ProjectSchema);