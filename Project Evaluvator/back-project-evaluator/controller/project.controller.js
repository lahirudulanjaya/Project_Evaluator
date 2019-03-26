const mongoose = require('mongoose')
const Project =mongoose.model('Project')

module.exports.addproject = (req,res,err)=>{
    var project = new Project();
    project.Projectname =req.body.Projectname;
    project.ProjectType =req.body.ProjectType;
    project.Acadamicyear =req.body.Acadamicyear;
    project.Initiatedate=req.body.Initiatedate;

    project.save((err,doc)=>{
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
module.exports.getprojectsnames=(req,res,err)=>{
    Project.find({Status:true},'Projectname',(err,doc)=>{
        if(!err){
            res.status(200).send(doc)
        }
    })
}

module.exports.updateproject =(req,res,err)=>{
    var project ={
        ProjectType:req.body.ProjectType,
        Acadamicyear:req.body.Acadamicyear,
        Initiatedate:req.body.Initiatedate
    }
    Project.findByIdAndUpdate({_id :req.body._id},{$set :project},{upsert:true},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send("Update Failed");
        }
    })
}
module.exports.deleteproject=(re,res,err)=>{
    Project.findByIdAndDelete({_id:req.body._id},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send("Delete Failed")
        }
    })
}