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
                groupno:String,
                starttime:String,
                endtime:String,
                evaluvators:[],
                venue:String

            }
        ],
        Evaluvatorlist:[]

    }
    
)
timeslotSchema.index({Projectname:1,Milestone:1},{unique:true})
mongoose.model("Timeslots",timeslotSchema)