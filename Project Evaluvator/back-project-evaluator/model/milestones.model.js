const mongoose =require('mongoose')

var Milestoneschema = new mongoose.Schema(
    {
        Projectname:{
            type:String,
            unique:true
        },
        Year:{
            type:String,
        },
        Milestone_id:
        {
            type :Number,
        },
        Milestone:{
            type:String,
        },
        Datetime:{
            type:Date
            
        }

    }
)
mongoose.model('Milestone',Milestoneschema)