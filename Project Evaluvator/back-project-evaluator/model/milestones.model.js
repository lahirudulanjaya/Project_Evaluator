const mongoose =require('mongoose')

var Milestoneschema = new mongoose.Schema(
    {
        Projectname:{
            type:String,
        },
        
        name:{
            type:String,
        },
        
        MilstoneType:{
            type:String
        },
        Markspresentatge:{
            type:String
            
        },
        Grp_or_I:{
            type:String
        },
        Duration:{
            type:String
        }


    }
)
mongoose.model('Milestone',Milestoneschema)