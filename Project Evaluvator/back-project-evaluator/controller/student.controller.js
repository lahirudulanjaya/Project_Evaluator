const mongoose =require('mongoose')
const passport = require('passport')
const _ = require('lodash')
const Student = mongoose.model('Students')

module.exports.register=(req,res,next)=>{
    var student = new Student()
    student.UserName = req.body.UserName
    student.Email = req.body.Email
    student.Registrationnumber =req.body.Registrationnumber
    student.Password =req.body.Password
    student.Cpassword = req.body.Cpassword
    student.save((err, doc) => {
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

}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.studentprofile = (req, res, next) =>{
    Student.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['UserName','Email','Registrationnumber','Phonenumber']) });
        }
    );
}