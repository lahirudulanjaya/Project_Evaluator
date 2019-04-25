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
        else{
            res.status(422).send(err)
        }
    })

}