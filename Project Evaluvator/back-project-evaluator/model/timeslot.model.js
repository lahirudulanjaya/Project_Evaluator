const mongoose =require('mongoose')

var timeslotSchema = new mongoose.Schema(
    {
        Projectname :{
            type:String
        },
        Milestone:{
            type :String
        },
        Timeslosts:[
            {
                Starttime:Date,
                Endtime:Date,
                Evaluaters:[],
                Venue:String

            }
        ]

    }
    
)
mongoose.model("Timeslots",timeslotSchema)