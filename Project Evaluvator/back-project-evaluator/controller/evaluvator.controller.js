const mongoose =require('mongoose')

const Evaluvator = mongoose.model('Evaluvator')
var generator = require('generate-password');
const Student = mongoose.model('Students')
var nodemailer = require('nodemailer');
var password

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ucscprojectevaluation@gmail.com',
      pass: 'ucsc@123'
    }
  });

module.exports.addEvaluvator=(req,res,next)=>{
     password = generator.generate( {
        length: 6,
        uppercase: false
    });
    console.log(password)

    var evaluvator = new Evaluvator()
    evaluvator.Registrationnumber = req.body.Registrationnumber
    evaluvator.Email = req.body.Email
    evaluvator.Password =password
    evaluvator.save((err, doc) => {
        if (!err){
            var student = new Student()
            student.UserName = req.body.Email
            student.Email = req.body.Email +"@ucsc.cmb.ac.lk"
            student.Registrationnumber =req.body.Registrationnumber
            student.Password =password
            student.Cpassword = password
            student.type ="evaluator"
            student.save((err, doc) => {
                if (!err){
                      
                    var mailOptions = {
                        from: 'ucscprojectevaluation@gmail.com',
                        to: student.Email,
                        subject: 'Group Project',
                        html: `use login link to login your username :<br/> <b> ${student.UserName}</b></br>  and password <b> ${password} </b> into the system <br> <a href=http://localhost:3000/login>login link</a>`
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          res.status(422).send(error)
                        } else {
                          res.status(200).json(info)
                        }
                      });         
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

        
}
module.exports.getEvaluvators =(req,res,next)=>{
    Evaluvator.find({},'Registrationnumber Email',(err,doc)=>{
        if(!err){
            res.status(200).json(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}
module.exports.deleteEvaluvator =(req,res,next)=>{
    Evaluvator.findOneAndDelete({Registrationnumber:req.params.Registrationnumber},(err,doc)=>{
        if(!err){
            Student.findOneAndDelete({Registrationnumber:req.params.Registrationnumber},(err,doc)=>{
                if(!err){
                    res.send(doc)
                }
                else{
                    res.send(err)
                }
            })
        }
        else{
            res.send(err)
        }
    })
}

module.exports.getevaluvatorscount = (req, res, next) => {
    Evaluvator.countDocuments({}, function (err, count) {
        if (err) {
            res.send(err);
        }
        else {
            res.status(200).json(count);
        }
    })
}
