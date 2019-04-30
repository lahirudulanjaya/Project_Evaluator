const mongoose =require('mongoose')
const Milestone = mongoose.model('Milestone')

module.exports.addmilestone=(req,res,next)=>{
    Milestone.insertMany(req.body.Milestones,(err,doc)=>{
        if (!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })
    

}

module.exports.getmilstones=(req,res,next)=>{
    Milestone.find({Projectname:req.params.Projectname},function(err,project){
        if(!err){
            res.status(200).send(project)
            console.log(project)
        }
        else if(!project){
            res.status(422).send("No project found")
        }
        else{
            res.status(422).send(err)
        }

    })

}
module.exports.getpresentationmilstones=(req,res,next)=>{
    Milestone.find({Projectname:req.params.id,MilstoneType:"presentation"},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}