const mongoose =require('mongoose')

const Sessioncoordinator = mongoose.model('Sessioncoordinator')
var generator = require('generate-password');
 


module.exports.addsessioncoodinator=(req,res,next)=>{
    var password = generator.generate( {
        length: 6,
        uppercase: false
    });

    var sessioncoordinator = new Sessioncoordinator()
    sessioncoordinator.Registrationnumber = req.body.Registrationnumber
    sessioncoordinator.Email = req.body.Email
    sessioncoordinator.Password =password
    sessioncoordinator.save((err, doc) => {
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
module.exports.getsessioncoodinator =(req,res,next)=>{
    Sessioncoordinator.find({},'Registrationnumber Email',(err,doc)=>{
        if(!err){
            res.status(200).json(doc)
        }
        else{
            res.status(422).send(err)
        }
    })
}
