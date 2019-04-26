const mongoose =require('mongoose')

const Grouprequest =mongoose.model("Grouprequest")

module.exports.sendgrouprequest=(req,res,next)=>{
    const grouprequest=new Grouprequest()
    grouprequest.reciver=req.body.reciver
    grouprequest.sender =req.body.sender

    grouprequest.save((err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else if(err.code =11000)
        {
            res.status(422).send("Data you have enterd is already entered")
        }
        else{
            return next(err);
        }
    })

}

module.exports.getsendrequest=(req,res,next)=>{
    Grouprequest.findOne({sender:req.params.id},'reciver',(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(404).send(err)
        }
    })
}

module.exports.getrequest=(req,res,next)=>{
    Grouprequest.find({reciver:{$elemMatch:{Registrationnumber:req.params.id,active:"pending"}}},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(404).send(err)
        }
    })
}
module.exports.checkaccepted=(req,res,next)=>{
    Grouprequest.find({reciver:{$elemMatch:{Registrationnumber:req.params.id,active:"accepted"}}},(err,doc)=>{
        if(!err){
            
                if(doc.length>0){
                    res.status(404).json("You already accept one reject one")
                }
                else{
                    Grouprequest.update({'reciver.Registrationnumber':req.params.id},{
                        $set: {
                            'reciver.$.active': 'accepted',
                        }
                    },(err,doc)=>{
                        if(!err){
                           res.send(doc)
                        }
                        else{
                            res.send(err)
                        }
                    })
                }
            
        }
        else{
            res.status(404).send(err)
        }
    })
}

// module.export.acceptRequest=(req,res,next)=>{
//     Grouprequest.find({'reciver.Registrationnumber'})

// }
