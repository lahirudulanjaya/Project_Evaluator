const mongoose = require('mongoose');

mongoose.connect("mongodb://lahiru:friends123@gruppro-2-shard-00-00-6hc2i.mongodb.net:27017,gruppro-2-shard-00-01-6hc2i.mongodb.net:27017,gruppro-2-shard-00-02-6hc2i.mongodb.net:27017/project?ssl=true&replicaSet=gruppro-2-shard-0&authSource=admin&retryWrites=true",{ useNewUrlParser: true },(err) =>{
    if(!err){
        console.log("Succecfullty connected")
    }
    else{
        console.log("error in connection: "+ JSON.stringify(err,undefined,2));
    }
})

require('./student.model')
require('./milestones.model')
require('./project.model')