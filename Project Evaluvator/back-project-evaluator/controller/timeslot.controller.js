
const mongoose =require('mongoose')
const Timeslot = mongoose.model("Timeslots")
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ucscprojectevaluation@gmail.com',
      pass: 'ucsc@123'
    }
  });


module.exports.addtimeslots=(req,res,next)=>{
    var timeslot = new Timeslot()
    timeslot.Projectname =req.body.Projectname
    timeslot.Milestone =req.body.Milestone
    timeslot.Timeslosts=req.body.Timeslots
  timeslot.Evaluvatorlist= req.body.evaluvatorsList
    timeslot.save((err, doc) => {
        if (!err){
            res.send(doc);            
        }
        else
        {
                if (err.code === 11000){
                    res.status(422).send('Data you entered has already been used');
                }
                else{
                    console.log(err)
                    return next(err);
                    }
        }
        });
var maillist=[]
console.log(req.body.evaluvatorsList)
req.body.evaluvatorsList.map(eva=>{
    var mail =eva.name +"@ucsc.cmb.ac.lk"
    maillist.push(mail)
})

console.log(req.body.Timeslots.toString())

var mailOptions = {
    from: 'ucscprojectevaluation@gmail.com',
    to: maillist,
    subject: 'Time Slots For Presentation',
    text: JSON.stringify(req.body.Timeslots)
  };
  console.log(maillist)
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

module.exports.gettimeslots=(req,res,next)=>{
  console.log(req.params)
  Timeslot.findOne({Projectname:req.query.Projectname,Milestone:req.query.Milestone},(err,doc)=>{
    if(!err){
      console.log(doc)
      res.send(doc)
    }
    else{
      res.send(err)
    }
  })
}
module.exports.updatetimeslots=(req,res,next)=>{
  console.log(req.body.Timeslots)
  Timeslot.findOneAndUpdate({Projectname:req.body.Projectname,Milestone:req.body.Milestone},{$set:{Timeslosts:req.body.Timeslots}},(err,doc)=>{
    if(!err){
      res.send(doc)
    }
    else{
      res.send(err)
    }
  })
}


module.exports.deletetimeslot =(req,res,next)=>{
  Timeslot.findOneAndDelete({Projectname:req.body.Projectname,Milestone:req.body.Milestone},(err,doc)=>{
      if(!err){
          res.send(doc)
      }
      else{
          res.send(err)
      }
  })
}