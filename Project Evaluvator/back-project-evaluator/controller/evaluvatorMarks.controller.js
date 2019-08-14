const mongoose = require('mongoose')
const Evaluvatormarks =mongoose.model('Evaluvatormarks')

module.exports.addmark = (req,res,err)=>{
    console.log(req.body)
    var formdata = new Evaluvatormarks();
    formdata.Projectname =req.body.Projectname;
    formdata.Milestone =req.body.Milestone;
    formdata.marks =req.body.marks;
    formdata.evaluvator=req.body.evaluvator

    formdata.save((err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else
        {
                if (err.code === 11000){
                    res.status(422).send('Data you  already marked');
                }
                else{
                    return next(err);
                    }
        }
    })

}