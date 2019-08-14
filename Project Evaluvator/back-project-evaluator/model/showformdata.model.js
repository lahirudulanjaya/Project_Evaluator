const mongoose =require('mongoose')

var showformdata = new mongoose.Schema(
    {
        Projectname :{
            type:String,
            
        },
        Milestone:{
            type :String,
            
        },
        Timeslost:
            {
                groupno:String,
                starttime:String,
                endtime:String,
                evaluvators:[],
                venue:String

            }
        

    }
    
)
mongoose.model("Showformdata",showformdata)