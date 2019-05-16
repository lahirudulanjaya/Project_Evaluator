const mongoose =require('mongoose')
const Milestone = mongoose.model('Milestone')
const Project =mongoose.model('Project')

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

module.exports.updatemilestones=(req,res,next)=>{
    const milestone ={
        MilstoneType:req.body.MilstoneType,
        Markspresentatge:req.body.Markspresentatge,
        Grp_or_I:req.body.Grp_or_I,
        Duration:req.body.Duration
    }
    console.log(milestone)
    Milestone.findOneAndUpdate({name:req.body.name,Projectname:req.body.Projectname},{$set:milestone},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}
module.exports.deletemilestone=(req,res,next)=>{
    console.log(req.body)
    Milestone.findOneAndRemove({name:req.body.name,Projectname:req.body.Projectname},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}

module.exports.getallmilstones=(req,res,next)=>{
   
               Milestone.find({},(err,doc)=>{
                   if(!err){
                       res.send(doc)
                   }
                   else{
                       res.send(err)
                   }
               })
           
}