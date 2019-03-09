const mongoose = require('mongoose')
const Project =mongoose.model('Project')

module.exports.addproject = (req,res,err)=>{
    var project = new Project();
    project.Projectid = req.body.Projectid;
    project.Projectyear =req.body.Projectyear;
    project.Type =req.body.Type;

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