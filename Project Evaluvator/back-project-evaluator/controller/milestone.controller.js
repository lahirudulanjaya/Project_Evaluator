const mongoose =require('mongoose')
const Milestone = mongoose.model('Milestone')

module.exports.addmilestone=(req,res,next)=>{
    var milestone = new Milestone();
    milestone.Projectname =req.body.Projectname;
    milestone.Year=req.body.Year;
    milestone.Milestone_id =req.body.Milestone_id;
    milestone.Milestone =req.body.Milestone;
    milestone.Datetime =req.body.Datetime
    milestone.save((err, doc) => {
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

module.exports.getmilstones=(req,res,next)=>{
    Milestone.findOne({Projectname:req.params.Projectname},function(err,project){
        if(!err){
            res.status(200).send(project)
        }
        else if(!project){
            res.status(422).send("No project found")
        }
        else{
            res.status(422).send(err)
        }

    })

}