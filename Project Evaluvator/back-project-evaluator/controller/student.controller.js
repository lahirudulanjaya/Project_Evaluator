const  Resize= require('../config/Resize')
const mongoose =require('mongoose')
const passport = require('passport')
const _ = require('lodash')
const Student = mongoose.model('Students')
const Studentdetail =mongoose.model('Studentdetail')
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const multer = require('multer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ucscprojectevaluation@gmail.com',
    pass: 'ucsc@123'
  }
});
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename: function(req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
   })


module.exports.register=(req,res,next)=>{
    var student = new Student()
    student.UserName = req.body.UserName
    student.Email = req.body.Email
    student.Registrationnumber =req.body.Registrationnumber
    student.Password =req.body.Password
    student.Cpassword = req.body.Cpassword

            Studentdetail.findOne({Registrationnumber:student.Registrationnumber},function(err,result){
                if(err)
                    throw err;
                else if(!result)
                    res.status(422).send('Details of User not found');
                else if(!(result.Email == student.Email))
                    res.status(422).send('Details of Email not found');
                else{
                    if(result.Email==student.Email){
                        student.save((err, user) => {
                            if (!err){
                                jwt.sign(
                                    {
                                      user: _.pick(user, 'Registrationnumber'),
                                    },
                                    process.env.JWT_SECRET,
                                    {
                                      expiresIn: '1d',
                                    },
                                    (err, emailToken) => {
                                      const url = `http://localhost:4000/api/confirmation/${emailToken}`;
                                      transporter.sendMail({
                                        to: user.Email,
                                        subject: 'Confirm Email',
                                        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                                      },
                                      res.send(user)
                                      );

                                    }
                                )
    
                            }
    
                            else
                            {
                                    if (err.code === 11000){
                                        res.status(422).send('Data you entered has already been used');
                                    }
                                    else{
                                        return next(err);
                                        }
                            }
                            });
    
                    }
                    else{
                        res.status(422).send('Enter Correct Email Address');
                    }
    
                }
            });
     

}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userprofile = (req, res, next) =>{
    Student.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{  
                return res.status(200).json({ status: true, user : _.pick(user,['UserName','Email','Registrationnumber']) });
       
            }
    }
    );
}

module.exports.Importstudent =(req,res,next)=>{
    // // res.forEach(element => {
    //     var studentdetails = new Studentdetail();
    //     studentdetails.Registrationnumber= req.body.Registrationnumber
    //     studentdetails.Name = req.body.Name
    //     studentdetails.save((err,doc)=>{
    //     if (!err){
    //         res.send(doc);            
    //     }
    //     else{
    //         console.log(err)
    //     }
        
    //  //   })
    
// })
    Studentdetail.insertMany(req.body.arr,(err,doc)=>{
        if (!err){
            res.send(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}

module.exports.getallStudentdetail =(req,res,next)=>{

    Studentdetail.find({},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else
        {
            res.status(422).send(err)
        }
    })
}
module.exports.sendemail =(req,res,next)=>{
    var maillist=[]

    Studentdetail.find({isRegistered:false},{'Email':1,'_id':0},(err,doc)=>{
        if(!err){
            
           doc.forEach((Email)=>{
            maillist.push(Email.Email)
            })
            console.log(maillist)
        }
    })
    var mailOptions = {
        from: 'ucscprojectevaluation@gmail.com',
        to: maillist,
        subject: 'Group Project',
        html: 'use registation link to register for your group project <br> <a href=http://localhost:3000/register>registartion link</a>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(422).send(error)
        } else {
          res.status(200).json(info)
        }
      });
}

module.exports.getstudentsbyYear =(req,res,next)=>{
    Studentdetail.find({$or:[ {Registrationnumber:new RegExp(req.params.year)},{Projectname:new RegExp(req.params.year)}]},'Projectname Registrationnumber Name',(err,doc)=>{
        if(!err){
            res.status(200).json(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}




module.exports.UpdateStudentDetail=(req,res,next)=>{
    const student ={
        Name :req.body.Name,
        Email:req.body.Email,

    }
    Studentdetail.findOneAndUpdate({Registrationnumber:req.body.Registrationnumber},{$set:student},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}


module.exports.UpdateStudentDetailMarks=(req,res,next)=>{
    const student ={      
       Marks:req.body.Marks
    }
    console.log('----UpdateStudentDetailMarks-----')
    Studentdetail.findOneAndUpdate({Registrationnumber:req.body.Registrationnumber},{$set:student},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}

module.exports.deleteStudent =(req,res,next)=>{
    Studentdetail.findOneAndDelete({Registrationnumber:req.params.Registrationnumber},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}

module.exports.getstudentscount = (req, res, next) => {
    Studentdetail.countDocuments({}, function (err, count) {
        if (err) {
            res.send(err);
        }
        else {
            res.status(200).json(count);
        }
    })
}


module.exports.verifyemail =(req,res,next)=>{

   const { user: { Registrationnumber } } =   jwt.verify(req.params.token,process.env.JWT_SECRET)
   console.log(Registrationnumber)
   Student.findOneAndUpdate({Registrationnumber:Registrationnumber},{$set:{Active:true}},(err,doc)=>{
    if(!err){
        res.send(doc)
    }
    else{
        res.send(err)
    }
})

}

module.exports.checkusername = (req,res,next)=>{
    Student.findOne({UserName: req.params.UserName}, function(err, data){
        if(!err){
            if(data==null){
                res.send(false);
            }
            else{
                const email= data.Email;
                const url = `http://localhost:3000/resetPassword/${req.params.UserName}`
                var mailOptions = {
                    from: 'ucscprojectevaluation@gmail.com',
                    to: email,
                    subject: 'Password Reset',
                    html: `To reset your password go to this link <br> <a href="${url}">registartion link</a>`
                  };
                res.send(true);
                console.log(email);
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      res.status(422).send(error)
                    } else {
                      res.status(200).json(info)
                    }
                  });
            }
        }
       
    })
}
module.exports.resetPassword=(req, res, next)=>{
    const passwords ={
        Password: req.body.Password,
        Cpassword: req.body.Cpassword,
        Salt:''
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(passwords.Password, salt, (err, hash) => {
            passwords.Password = hash;
            passwords.Cpassword= hash;
            passwords.Salt = salt;
            Student.findOneAndUpdate({UserName:req.params.UserName},{$set:passwords},(err, doc)=>{
                console.log(passwords);
                console.log(req.params.UserName);
                if(err){
                    res.send(err);
                }
                else{
                    res.send(true);
                }
            })
        });
    });
}

module.exports.UpdateStudent=(req,res,next)=>{
    Student.findOneAndUpdate({Registrationnumber:req.params.Registrationnumber},{$set:req.body.student},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            res.send(err)
        }
    })
}

module.exports.uploadimage =(req,res,next)=>{

    // let upload = multer( {
    //     storage: storage,
    //     fileFilter: function(req, file, callback) {
    //         let ext = path.extname(file.originalname)
    //         if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //             return callback(res.end('Only images are allowed'), null)
    //         }
    //         callback(null, true)
    //     }
    // }).single('userFile');
  console.log(req.file)


}

