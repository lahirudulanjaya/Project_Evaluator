const mongoose =require('mongoose')

const Evaluvator = mongoose.model('Evaluvator')
var generator = require('generate-password');
 


module.exports.addEvaluvator=(req,res,next)=>{
    var password = generator.generate( {
        length: 6,
        uppercase: false
    });

    var evaluvator = new Evaluvator()
    evaluvator.Registrationnumber = req.body.Registrationnumber
    evaluvator.Email = req.body.Email
    evaluvator.Password =password
    evaluvator.save((err, doc) => {
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
