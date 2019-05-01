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
        },
        start:{
            type:Boolean,
            default:false
        },
        stop:{
            type:Boolean,
            default:false
        }


    }
)
mongoose.model('Milestone',Milestoneschema)