const mongoose =require('mongoose')

var timeslotSchema = new mongoose.Schema(
    {
        Projectname :{
            type:String,
            
        },
        Milestone:{
            type :String,
            
        },
        Timeslosts:[
            {
                start:Date,
                end:Date,
                evaluvators:[],
                venue:String

            }
        ]

    }
    
)
timeslotSchema.index({Projectname:1,Milestone:1},{unique:true})
mongoose.model("Timeslots",timeslotSchema)