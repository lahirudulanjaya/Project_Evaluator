const mongoose = require('mongoose')
const Showformdata =mongoose.model('Showformdata')

module.exports.addshowformdata = (req,res,err)=>{
    console.log(req.body)
    var formdata = new Showformdata();
    formdata.Projectname =req.body.Projectname;
    formdata.Milestone =req.body.Milestone;
    formdata.Timeslost =req.body.Timeslost;

    formdata.save((err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log(err)
        }
    })

}

module.exports.getallform=(req,res,err)=>{
    Showformdata.find({},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}

module.exports.deleteformdata=(req,res,err)=>{
    console.log(req.body)
    Showformdata.remove({ Projectname:req.body.Projectname},(err,doc)=>{
        if(!err){
res.send(doc)
        }
        else{
            res.send(err)
        }
    } )
}