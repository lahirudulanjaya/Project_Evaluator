const mongoose =require('mongoose')

var evaluvatorMarks = new mongoose.Schema(
    {

    Projectname :{
        type:String,
    },
    Milestone:{
        type:String,
    },
    marks:{
        groupno:'',
        groupmark:Number,
        individualmarks:[]

        
    },
    evaluvator:{type:String,unique:true}
 

})

mongoose.model("Evaluvatormarks",evaluvatorMarks)