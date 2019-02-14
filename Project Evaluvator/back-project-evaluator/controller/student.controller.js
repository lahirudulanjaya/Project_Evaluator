const mongoose =require('mongoose')

const Student = mongoose.model('Students')

module.exports.register=(req,res,next)=>{
    var student = new Student()
    student.UserName = req.body.UserName
    student.Email = req.body.Email
    student.Registrationnumber =req.body.Registrationnumber
    student.Password =req.body.Password
    student.Cpassword = req.body.Cpassword
    console.log(student.Salt);
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