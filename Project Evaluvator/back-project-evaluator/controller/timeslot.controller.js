
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

var mailOptions = {
    from: 'ucscprojectevaluation@gmail.com',
    to: maillist,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
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
  Timeslot.findOne({Projectname:req.params.Projectname},(err,doc)=>{
    if(!err){
      console.log(doc)
      res.send(doc)
    }
    else{
      res.send(err)
    }
  })
}