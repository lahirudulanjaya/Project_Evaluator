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
module.exports.deleteproject=(req,res,err)=>{
    Project.findByIdAndDelete({_id:req.body._id},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send("Delete Failed")
        }
    })
}
module.exports.getallprojects =(req,res,err)=>{
    Project.find({},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}

module.exports.updatestate=(req,res,err)=>{
    Project.findOneAndUpdate({_id:req.body._id},{$set:{Status:!req.body.Status}},function(err,doc){
        if(!err){
            res.send(doc)
        }
        else{
console.log(err)
        }
    })
}

module.exports.addGroups=(req,res,err)=>{
    console.log(req.body.groups)
    Project.findOneAndUpdate({Projectname:req.body.Projectname},{$set :{groups:req.body.groups} },{$inc:{'groups.$.groupno':1}},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}

module.exports.getreleventProject=(req,res,next)=>{
    Project.find({'groups.students.Registrationnumber':new RegExp(req.params.id)},'groups Projectname Acadamicyear',(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).json(err)
        }
    })
}

module.exports.getproject =(req,res,next)=>{
    Project.find({Projectname:req.params.id},'groups',(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}


module.exports.getGroupMembers =(req,res,next)=>{//using project name & students array index
    console.log(req.params.projectName)
    console.log(req.params.indexOfstudentArray)
    Project.find({Projectname:req.params.projectName},'groups',(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}


module.exports.updateproject=(req,res,next)=>{
    const project ={
        ProjectType:req.body.ProjectType,
        Initiatedate:req.body.Initiatedate,
        Acadamicyear:req.body.Acadamicyear,
       
    }
    Project.findOneAndUpdate({Projectname:req.body.Projectname},{$set:project},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}
module.exports.deleteproject=(req,res,next)=>{
    Project.findOneAndRemove({Projectname:req.params.projectname},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
            res.send(err)
        }
    })
}
module.exports.deletegroups =(req,res,next)=>{
    Project.update({Projectname:req.params.Projectname}, {$unset: {groups:1}} , {multi: true},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
  
}


module.exports.getprojectscount = (req, res, next) => {
    Project.countDocuments({}, function (err, count) {
        if (err) {
            res.send(err);
        }
        else {
            res.status(200).json(count);
        }
    })
}
module.exports.deletegooglesheet =(req,res,next)=>{
    Project.update({Projectname:req.params.Projectname},{$unset:{Sheeturl:1}},{multi:true},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}


