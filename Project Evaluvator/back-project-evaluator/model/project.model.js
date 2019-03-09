const mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema({
    Projectid:{
        type:String,
        unique:true
    },
    Projectyear:{
        type:String,
    },
    Type:{
        type:String
    }
})

mongoose.model('Project',ProjectSchema);